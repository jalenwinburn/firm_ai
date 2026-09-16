"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const mobileMenu = $('.mobile-nav-toggle');
mobileMenu?.addEventListener('click', () => {
  const open = mobileMenu.getAttribute('aria-expanded') !== 'true';
  mobileMenu.setAttribute('aria-expanded', String(open));
  $('#landing-links').classList.toggle('is-open', open);
});
$$('#landing-links a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.setAttribute('aria-expanded','false');
  $('#landing-links').classList.remove('is-open');
}));
if ($('#analysis-view')) {
  const tabs = $$('.analysis-tab'), panels = $$('.tab-content');
  const workspace = $('#workspace-view'), analysis = $('#analysis-view');
  const menu = $('.workspace-nav-toggle'), sidebar = $('.sidebar');
  const titles = {overview:'Workspace overview',opportunities:'Opportunities',projects:'Project experience',team:'Team planning',financials:'Financial outlook'};
  const projectMarkup = $('#projects .app-project-list').outerHTML;
  const teamMarkup = $('#team .app-project-list').outerHTML;
  const financialMarkup = $('#financials .app-metrics').outerHTML;
  const opportunityCard = `<a class="opportunity-card" href="#analysis/overview"><div><span class="eyebrow">RFQ · AUSTIN, TEXAS</span><h2>Austin Downtown Mixed-Use</h2><p>City of Austin · Atlas Studio</p></div><div class="card-score"><strong>82<span>/100</span></strong><span class="pursue-tag">Pursue</span></div><span class="card-arrow" aria-hidden="true">↗</span></a>`;
  function closeMenu() {menu.setAttribute('aria-expanded','false');sidebar.classList.remove('is-open');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));sidebar.classList.toggle('is-open',open);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('is-open')){closeMenu();menu.focus();}});
  function renderRoute() {
    const parts=location.hash.replace(/^#/,'').split('/');
    const isWorkspace=parts[0]==='workspace' && Object.hasOwn(titles,parts[1]);
    const selected=parts[1]||'overview';
    analysis.hidden=isWorkspace;workspace.hidden=!isWorkspace;
    $$('.sidebar-link').forEach(a=>{const active=a.hash===`#workspace/${isWorkspace?selected:'opportunities'}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    $('.app-breadcrumb').textContent=isWorkspace?`WORKSPACE / ${selected.toUpperCase()}`:'OPPORTUNITIES / ANALYSIS';
    if(isWorkspace) {
      let content='';
      if(selected==='overview')content=`<div class="workspace-stats"><div><span>Sample opportunities</span><strong>01</strong></div><div><span>Relevant projects</span><strong>03</strong></div><div><span>Estimated fee</span><strong>$425K</strong></div></div><div class="section-header"><h2>Opportunity in focus</h2><a href="#workspace/opportunities">View opportunities →</a></div>${opportunityCard}`;
      if(selected==='opportunities')content=`<p class="workspace-description">Explore the sample opportunity and the evidence behind its recommendation.</p>${opportunityCard}`;
      if(selected==='projects')content=`<p class="workspace-description">Sample project experience matched to the Austin opportunity.</p>${projectMarkup}<a class="text-link" href="#analysis/projects">See opportunity comparison →</a>`;
      if(selected==='team')content=`<p class="workspace-description">Illustrative role matches and availability for the Austin opportunity.</p>${teamMarkup}<a class="text-link" href="#analysis/team">See recommended team →</a>`;
      if(selected==='financials')content=`<p class="workspace-description">Illustrative economics for the sample opportunity.</p>${financialMarkup}<p class="financial-note">$425K fee − $306K delivery cost = $119K projected profit. The 28% margin is 6 percentage points above the 22% sample target.</p><a class="text-link" href="#analysis/financials">See opportunity financials →</a>`;
      workspace.innerHTML=`<div class="workspace-heading"><span class="eyebrow">ATLAS STUDIO / DEMO</span><h1>${titles[selected]}</h1></div>${content}`;
      document.title=`${titles[selected]} — Firm AI`;
    } else {
      const id=tabs.some(t=>t.dataset.tab===selected)?selected:'overview';
      tabs.forEach(t=>{const active=t.dataset.tab===id;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
      panels.forEach(p=>{p.style.removeProperty('display');p.hidden=p.id!==id;});
      document.title='Austin Downtown Mixed-Use — Firm AI';
    }
    closeMenu();
  }
  tabs.forEach((tab,i)=>{
    tab.id=`tab-${tab.dataset.tab}`;tab.setAttribute('role','tab');tab.setAttribute('aria-controls',tab.dataset.tab);
    const panel=document.getElementById(tab.dataset.tab);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;
    tab.addEventListener('click',()=>{location.hash=`analysis/${tab.dataset.tab}`;});
    tab.addEventListener('keydown',e=>{
      let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
      if(next!==undefined){e.preventDefault();tabs[next].focus();tabs[next].click();}
    });
  });
  $('.view-button').addEventListener('click',()=>{location.hash='analysis/projects';$('#tab-projects').focus();});
  window.addEventListener('hashchange',renderRoute);renderRoute();
  const dialog=$('#actions-dialog');
  $('#opportunity-actions').addEventListener('click',()=>dialog.showModal());
  $('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  $('#print-summary').addEventListener('click',()=>{dialog.close();window.print();});
  $('#download-summary').addEventListener('click',()=>{
    const lines=['FIRM AI — SAMPLE OPPORTUNITY SUMMARY','DEMO DATA — Not a live AI analysis or recommendation.','','Austin Downtown Mixed-Use','City of Austin · Atlas Studio','','Recommendation: Pursue','Opportunity score: 82/100','Firm match: 87%','Estimated fee: $425,000','Projected cost: $306,000','Projected profit: $119,000','Projected margin: 28% (sample target: 22%)','','Primary drivers: Relevant experience, profitability, Austin market alignment.','Risks: 12-day illustrative proposal timeline; limited Q1 senior leadership availability.','','Similar projects: The Domain Expansion (91%), Mueller Development (84%), East Riverside District (79%).','','Recommended roles: Senior Project Principal (94%), Project Designer (89%), Landscape Architect (82%).'];
    const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='Firm-AI-sample-opportunity.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);dialog.close();
    $('#status').textContent='Sample summary downloaded.';setTimeout(()=>{$('#status').textContent='';},4000);
  });
}
