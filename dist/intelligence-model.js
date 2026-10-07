/* Local fixture verification only. This module does not generate AI conclusions. */
(function (root) {
  "use strict";
  function evaluatePeople(data) {
    return data.people.map((p) => ({
      ...p,
      relationships: data.relationships.filter((r) => r.employee === p.id),
      available: p.alloc.map((v) => (v == null ? null : 100 - v)),
    }));
  }
  async function analyze(result, data, report, signal) {
    const check = () => {
      if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    };
    const yieldFrame = () =>
      new Promise((resolve) => {
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(() => requestAnimationFrame(resolve));
        else setTimeout(resolve, 0);
      });
    const source = data.sources.find(
      (s) =>
        s.file ===
        result.sources.find((s) => s.id === result.opportunity.primarySourceId)
          .documentId,
    );
    const stages = [
      [
        "document",
        () =>
          `${source.pages?.length || 0} prepared source pages · original document linked`,
      ],
      [
        "requirements",
        () =>
          `${result.requirements.length} source-linked requirements · ${result.opportunity.dueLabel}`,
      ],
      [
        "experience",
        () =>
          `${result.experience.evaluatedCount} projects evaluated · ${result.experience.candidates.length} candidates in this result`,
      ],
      [
        "people",
        () =>
          `${result.team.evaluatedCount} people evaluated · ${data.relationships.length} recorded project-team relationships`,
      ],
      ["capacity", () => result.team.forecastNote],
      [
        "recommendation",
        () =>
          `${result.recommendation.decision} ${result.recommendation.value ?? "Not assessed"} · ${result.disclosure.evaluation}`,
      ],
    ];
    root.FIRM_ANALYSIS_CONTRACT.validate(result, data);
    for (const [id, run] of stages) {
      check();
      report({ id, state: "running" });
      await yieldFrame();
      check();
      report({ id, state: "complete", message: run() });
      await yieldFrame();
    }
    check();
    return result;
  }
  root.FIRM_INTELLIGENCE = { evaluatePeople, analyze };
})(typeof window !== "undefined" ? window : globalThis);
