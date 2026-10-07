/* AnalysisResult v1: declarative JSON Schema plus dependency-free runtime validation. */
(function (root) {
  "use strict";
  const schema = {
    type: "object",
    additionalProperties: false,
    required: [
      "schemaVersion",
      "id",
      "kind",
      "firmSnapshotId",
      "opportunity",
      "disclosure",
      "recommendation",
      "scores",
      "sources",
      "overview",
      "requirements",
      "procurement",
      "deadlines",
      "selection",
      "selectionSources",
      "risks",
      "experience",
      "team",
      "financials",
      "strategy",
      "firmEvidence",
    ],
    properties: {
      schemaVersion: {
        const: 1,
      },
      id: {
        type: "string",
      },
      kind: {
        enum: ["curated-demo", "test-fixture"],
      },
      firmSnapshotId: {
        type: "string",
      },
      opportunity: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "name",
          "titleLines",
          "eyebrow",
          "client",
          "location",
          "disciplines",
          "due",
          "dueLabel",
          "dueShort",
          "dueYearTime",
          "issued",
          "intervalLabel",
          "constructionBudget",
          "budgetBasis",
          "area",
          "areaContext",
          "anticipatedStart",
          "primarySourceId",
        ],
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          titleLines: {
            type: "array",
            items: {
              type: "string",
            },
          },
          eyebrow: {
            type: "string",
          },
          client: {
            type: "string",
          },
          location: {
            type: "string",
          },
          disciplines: {
            type: "array",
            items: {
              type: "string",
            },
          },
          due: {
            type: "string",
          },
          dueLabel: {
            type: "string",
          },
          dueShort: {
            type: "string",
          },
          dueYearTime: {
            type: "string",
          },
          issued: {
            type: "string",
          },
          intervalLabel: {
            type: "string",
          },
          constructionBudget: {
            type: ["number", "null"],
          },
          budgetBasis: {
            type: "string",
          },
          area: {
            type: "string",
          },
          areaContext: {
            type: "string",
          },
          anticipatedStart: {
            type: "string",
          },
          primarySourceId: {
            type: "string",
          },
        },
      },
      disclosure: {
        type: "object",
        additionalProperties: false,
        required: [
          "badge",
          "evaluation",
          "match",
          "score",
          "project",
          "person",
          "source",
          "footer",
          "run",
        ],
        properties: {
          badge: {
            type: "string",
          },
          evaluation: {
            type: "string",
          },
          match: {
            type: "string",
          },
          score: {
            type: "string",
          },
          project: {
            type: "string",
          },
          person: {
            type: "string",
          },
          source: {
            type: "string",
          },
          footer: {
            type: "string",
          },
          run: {
            type: "string",
          },
        },
      },
      recommendation: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "label",
          "value",
          "confidence",
          "reason",
          "evidence",
          "projects",
          "sources",
          "decision",
          "summary",
          "statement",
          "drivers",
          "people",
          "components",
        ],
        properties: {
          id: {
            type: "string",
          },
          label: {
            type: "string",
          },
          value: {
            type: ["number", "null"],
          },
          confidence: {
            type: "string",
          },
          reason: {
            type: "string",
          },
          evidence: {
            type: "array",
            items: {
              type: "string",
            },
          },
          projects: {
            type: "array",
            items: {
              type: "string",
            },
          },
          sources: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
          decision: {
            type: "string",
          },
          summary: {
            type: "string",
          },
          statement: {
            type: "array",
            items: {
              type: "string",
            },
          },
          drivers: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["title", "detail", "concern"],
              properties: {
                title: {
                  type: "string",
                },
                detail: {
                  type: "string",
                },
                concern: {
                  type: "boolean",
                },
              },
            },
          },
          people: {
            type: "array",
            items: {
              type: "string",
            },
          },
          components: {
            type: "array",
            items: {
              type: "array",
              prefixItems: [
                {
                  type: "string",
                },
                {
                  type: ["number", "null"],
                },
              ],
              minItems: 2,
              maxItems: 2,
              items: false,
            },
          },
        },
      },
      scores: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "label",
            "short",
            "value",
            "confidence",
            "reason",
            "evidence",
            "projects",
            "sources",
            "components",
            "people",
          ],
          properties: {
            id: {
              type: "string",
            },
            label: {
              type: "string",
            },
            short: {
              type: "string",
            },
            value: {
              type: ["number", "null"],
            },
            confidence: {
              type: "string",
            },
            reason: {
              type: "string",
            },
            evidence: {
              type: "array",
              items: {
                type: "string",
              },
            },
            projects: {
              type: "array",
              items: {
                type: "string",
              },
            },
            sources: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["sourceId", "page", "label"],
                properties: {
                  sourceId: {
                    type: "string",
                  },
                  page: {
                    type: "number",
                  },
                  label: {
                    type: "string",
                  },
                },
              },
            },
            components: {
              type: "array",
              items: {
                type: "array",
                prefixItems: [
                  {
                    type: "string",
                  },
                  {
                    type: ["number", "null"],
                  },
                ],
                minItems: 2,
                maxItems: 2,
                items: false,
              },
            },
            people: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
      sources: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "documentId", "kind"],
          properties: {
            id: {
              type: "string",
            },
            documentId: {
              type: "string",
            },
            kind: {
              type: "string",
            },
          },
        },
      },
      overview: {
        type: "object",
        additionalProperties: false,
        required: ["title", "paragraphs", "sources", "requirementIds"],
        properties: {
          title: {
            type: "array",
            items: {
              type: "string",
            },
          },
          paragraphs: {
            type: "array",
            items: {
              type: "string",
            },
          },
          sources: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
          requirementIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      requirements: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "title", "detail", "type", "sources"],
          properties: {
            id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            detail: {
              type: "string",
            },
            type: {
              type: "string",
            },
            sources: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["sourceId", "page", "label"],
                properties: {
                  sourceId: {
                    type: "string",
                  },
                  page: {
                    type: "number",
                  },
                  label: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      procurement: {
        type: "object",
        additionalProperties: false,
        required: [
          "description",
          "callout",
          "scheduleLabel",
          "scheduleNote",
          "scheduleSources",
        ],
        properties: {
          description: {
            type: "string",
          },
          callout: {
            type: "object",
            additionalProperties: false,
            required: ["title", "detail", "sources"],
            properties: {
              title: {
                type: "string",
              },
              detail: {
                type: "string",
              },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["sourceId", "page", "label"],
                  properties: {
                    sourceId: {
                      type: "string",
                    },
                    page: {
                      type: "number",
                    },
                    label: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          scheduleLabel: {
            type: "string",
          },
          scheduleNote: {
            type: "string",
          },
          scheduleSources: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      deadlines: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["date", "label", "detail", "id", "featured", "primary"],
          properties: {
            date: {
              type: "string",
            },
            label: {
              type: "string",
            },
            detail: {
              type: "string",
            },
            id: {
              type: "string",
            },
            featured: {
              type: "boolean",
            },
            primary: {
              type: "boolean",
            },
          },
        },
      },
      selection: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["title", "weight", "position", "detail"],
          properties: {
            title: {
              type: "string",
            },
            weight: {
              type: "number",
            },
            position: {
              type: "string",
            },
            detail: {
              type: "string",
            },
          },
        },
      },
      selectionSources: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["sourceId", "page", "label"],
          properties: {
            sourceId: {
              type: "string",
            },
            page: {
              type: "number",
            },
            label: {
              type: "string",
            },
          },
        },
      },
      risks: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["level", "title", "detail", "action", "score"],
          properties: {
            level: {
              type: "string",
            },
            title: {
              type: "string",
            },
            detail: {
              type: "string",
            },
            action: {
              type: "string",
            },
            score: {
              type: "string",
            },
          },
        },
      },
      experience: {
        type: "object",
        additionalProperties: false,
        required: [
          "evaluatedCount",
          "description",
          "overviewNote",
          "matchNote",
          "callout",
          "candidates",
          "leadProjectIds",
        ],
        properties: {
          evaluatedCount: {
            type: "number",
          },
          description: {
            type: "string",
          },
          overviewNote: {
            type: "string",
          },
          matchNote: {
            type: "string",
          },
          callout: {
            type: "object",
            additionalProperties: false,
            required: ["title", "detail", "sources"],
            properties: {
              title: {
                type: "string",
              },
              detail: {
                type: "string",
              },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["sourceId", "page", "label"],
                  properties: {
                    sourceId: {
                      type: "string",
                    },
                    page: {
                      type: "number",
                    },
                    label: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          candidates: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["projectId", "match", "signals", "reason", "sources"],
              properties: {
                projectId: {
                  type: "string",
                },
                match: {
                  type: ["number", "null"],
                },
                signals: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                reason: {
                  type: "string",
                },
                sources: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["sourceId", "page", "label"],
                    properties: {
                      sourceId: {
                        type: "string",
                      },
                      page: {
                        type: "number",
                      },
                      label: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          leadProjectIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      team: {
        type: "object",
        additionalProperties: false,
        required: [
          "evaluatedCount",
          "description",
          "matchNote",
          "capacityNote",
          "forecastNote",
          "members",
          "comparison",
          "disciplines",
          "disciplineNote",
          "disciplineSources",
        ],
        properties: {
          evaluatedCount: {
            type: "number",
          },
          description: {
            type: "string",
          },
          matchNote: {
            type: "string",
          },
          capacityNote: {
            type: "string",
          },
          forecastNote: {
            type: "string",
          },
          members: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "personId",
                "role",
                "match",
                "reason",
                "constrained",
                "sources",
              ],
              properties: {
                personId: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
                match: {
                  type: ["number", "null"],
                },
                reason: {
                  type: "string",
                },
                constrained: {
                  type: "boolean",
                },
                sources: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["sourceId", "page", "label"],
                    properties: {
                      sourceId: {
                        type: "string",
                      },
                      page: {
                        type: "number",
                      },
                      label: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          comparison: {
            type: "object",
            additionalProperties: false,
            required: [
              "title",
              "personIds",
              "periodIndices",
              "periodLabels",
              "detail",
              "dates",
              "sources",
            ],
            properties: {
              title: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              personIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              periodIndices: {
                type: "array",
                items: {
                  type: "number",
                },
              },
              periodLabels: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              detail: {
                type: "string",
              },
              dates: {
                type: "string",
              },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["sourceId", "page", "label"],
                  properties: {
                    sourceId: {
                      type: "string",
                    },
                    page: {
                      type: "number",
                    },
                    label: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          disciplines: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["name", "status"],
              properties: {
                name: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
              },
            },
          },
          disciplineNote: {
            type: "string",
          },
          disciplineSources: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      financials: {
        type: "object",
        additionalProperties: false,
        required: [
          "title",
          "feeRange",
          "confidence",
          "confidenceNote",
          "note",
          "callout",
          "comparableProjectIds",
          "guardrails",
          "guardrailSources",
          "coverageNote",
          "coverageSources",
        ],
        properties: {
          title: {
            type: "string",
          },
          feeRange: {
            anyOf: [
              {
                type: "object",
                additionalProperties: false,
                required: ["low", "high", "label", "basis"],
                properties: {
                  low: {
                    type: ["number", "null"],
                  },
                  high: {
                    type: ["number", "null"],
                  },
                  label: {
                    type: "string",
                  },
                  basis: {
                    type: "string",
                  },
                },
              },
              {
                type: "null",
              },
            ],
          },
          confidence: {
            type: "string",
          },
          confidenceNote: {
            type: "string",
          },
          note: {
            type: "string",
          },
          callout: {
            type: "object",
            additionalProperties: false,
            required: ["title", "detail", "sources"],
            properties: {
              title: {
                type: "string",
              },
              detail: {
                type: "string",
              },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["sourceId", "page", "label"],
                  properties: {
                    sourceId: {
                      type: "string",
                    },
                    page: {
                      type: "number",
                    },
                    label: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          comparableProjectIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
          guardrails: {
            type: "array",
            items: {
              type: "string",
            },
          },
          guardrailSources: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
          coverageNote: {
            type: "string",
          },
          coverageSources: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      strategy: {
        type: "object",
        additionalProperties: false,
        required: [
          "title",
          "subtitle",
          "overviewTitle",
          "overview",
          "themes",
          "projectOrder",
        ],
        properties: {
          title: {
            type: "array",
            items: {
              type: "string",
            },
          },
          subtitle: {
            type: "string",
          },
          overviewTitle: {
            type: "string",
          },
          overview: {
            type: "string",
          },
          themes: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["title", "detail", "sources"],
              properties: {
                title: {
                  type: "string",
                },
                detail: {
                  type: "string",
                },
                sources: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["sourceId", "page", "label"],
                    properties: {
                      sourceId: {
                        type: "string",
                      },
                      page: {
                        type: "number",
                      },
                      label: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          projectOrder: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["projectId", "label"],
              properties: {
                projectId: {
                  type: "string",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      firmEvidence: {
        type: "object",
        additionalProperties: false,
        required: ["projects", "people"],
        properties: {
          projects: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
          people: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceId", "page", "label"],
              properties: {
                sourceId: {
                  type: "string",
                },
                page: {
                  type: "number",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "Firm AI AnalysisResult v1",
  };
  function validate(result, data) {
    const fail = (path, reason) => {
      throw new Error(`Invalid analysis result at ${path}: ${reason}`);
    };
    function visit(value, rule, path) {
      if (rule.anyOf) {
        if (
          !rule.anyOf.some((option) => {
            try {
              visit(value, option, path);
              return true;
            } catch {
              return false;
            }
          })
        )
          fail(path, "does not match an allowed shape");
        return;
      }
      if ("const" in rule && value !== rule.const)
        fail(path, "unsupported version");
      if (rule.enum && !rule.enum.includes(value))
        fail(path, "unsupported value");
      const type =
        value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
      if (rule.type && ![].concat(rule.type).includes(type))
        fail(path, `expected ${rule.type}`);
      if (type === "number" && !Number.isFinite(value))
        fail(path, "number must be finite");
      if (type === "object") {
        for (const key of rule.required || [])
          if (!(key in value)) fail(`${path}.${key}`, "required");
        for (const [key, child] of Object.entries(value)) {
          if (!rule.properties?.[key]) fail(`${path}.${key}`, "unknown field");
          visit(child, rule.properties[key], `${path}.${key}`);
        }
      }
      if (type === "array") {
        if (
          (rule.minItems && value.length < rule.minItems) ||
          (rule.maxItems && value.length > rule.maxItems)
        )
          fail(path, "invalid item count");
        value.forEach((child, index) =>
          visit(
            child,
            rule.prefixItems?.[index] || rule.items,
            `${path}[${index}]`,
          ),
        );
      }
    }
    visit(result, schema, "result");
    if (result.firmSnapshotId !== data.snapshot)
      fail("firmSnapshotId", "result does not match the loaded firm snapshot");
    const unique = (items, key, label) => {
      const ids = items.map((x) => x[key]);
      if (new Set(ids).size !== ids.length) fail(label, "duplicate IDs");
      for (const id of ids)
        if (!/^[A-Za-z0-9_-]+$/.test(id)) fail(label, "unsafe ID");
      return new Set(ids);
    };
    const sourceIds = unique(result.sources, "id", "sources");
    const scoreIds = unique(
      [result.recommendation, ...result.scores],
      "id",
      "scores",
    );
    const reqIds = unique(result.requirements, "id", "requirements");
    unique(result.deadlines, "id", "deadlines");
    unique(result.experience.candidates, "projectId", "candidates");
    unique(result.team.members, "personId", "team");
    const projects = new Set(data.projects.map((p) => p.id)),
      people = new Set(data.people.map((p) => p.id));
    const documents = new Map(data.sources.map((s) => [s.file, s]));
    const sources = new Map(
      result.sources.map((s) => [s.id, documents.get(s.documentId)]),
    );
    for (const s of result.sources) {
      if (!documents.has(s.documentId))
        fail("sources", `unknown document ${s.documentId}`);
      const url = documents.get(s.documentId).url;
      if (!/^sources\/[A-Za-z0-9_.-]+$/.test(url))
        fail("sources", "unsafe original document URL");
      if (!["firm", "opportunity"].includes(s.kind))
        fail("sources", "invalid kind");
    }
    if (!sourceIds.has(result.opportunity.primarySourceId))
      fail("opportunity.primarySourceId", "unknown source");
    for (const id of result.overview.requirementIds)
      if (!reqIds.has(id))
        fail("overview.requirementIds", "unknown requirement");
    function refs(value, key = "") {
      if (Array.isArray(value)) {
        if (
          ["projects", "leadProjectIds", "comparableProjectIds"].includes(
            key,
          ) &&
          value.every((v) => typeof v === "string")
        )
          for (const id of value)
            if (!projects.has(id)) fail(key, `unknown project ${id}`);
        if (
          ["people", "personIds"].includes(key) &&
          value.every((v) => typeof v === "string")
        )
          for (const id of value)
            if (!people.has(id)) fail(key, `unknown person ${id}`);
        value.forEach((v) => refs(v));
      } else if (value && typeof value === "object") {
        if ("sourceId" in value) {
          const doc = sources.get(value.sourceId);
          if (
            !doc ||
            !Number.isInteger(value.page) ||
            value.page < 1 ||
            value.page > (doc.pages?.length || 1)
          )
            fail("citation", "unknown source or invalid page");
        }
        if ("projectId" in value && !projects.has(value.projectId))
          fail("projectId", "unknown project");
        if ("personId" in value && !people.has(value.personId))
          fail("personId", "unknown person");
        if ("score" in value && "action" in value && !scoreIds.has(value.score))
          fail("risk.score", "unknown score");
        for (const [k, v] of Object.entries(value)) refs(v, k);
      }
    }
    refs(result);
    for (const s of [result.recommendation, ...result.scores]) {
      if (s.value !== null && (s.value < 0 || s.value > 100))
        fail("score.value", "outside 0–100");
      for (const [, v] of s.components)
        if (v !== null && (v < 0 || v > 100))
          fail("score.components", "outside 0–100");
    }
    for (const x of [...result.experience.candidates, ...result.team.members])
      if (x.match !== null && (x.match < 0 || x.match > 100))
        fail("match", "outside 0–100");
    if (result.recommendation.id !== "pursuit")
      fail("recommendation.id", "must be pursuit");
    if (
      result.team.comparison.periodIndices.length !==
      result.team.comparison.periodLabels.length
    )
      fail("comparison", "period labels do not match");
    for (const i of result.team.comparison.periodIndices)
      if (!Number.isInteger(i) || i < 0 || i >= data.periods.length)
        fail("comparison", "unknown period");
    for (const id of result.team.comparison.personIds)
      if (!result.team.members.some((m) => m.personId === id))
        fail("comparison", "person is not a recommended member");
    for (const id of result.experience.leadProjectIds)
      if (!result.experience.candidates.some((p) => p.projectId === id))
        fail("experience", "lead is not a candidate");
    for (const c of result.selection)
      if (c.weight < 0 || c.weight > 100)
        fail("selection", "weight outside 0–100");
    return result;
  }
  root.FIRM_ANALYSIS_CONTRACT = { schema, validate };
  if (typeof module !== "undefined")
    module.exports = root.FIRM_ANALYSIS_CONTRACT;
})(typeof window !== "undefined" ? window : globalThis);
