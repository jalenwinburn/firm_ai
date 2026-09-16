/* Curated Product & UX demo decisions. These are not source facts or a live AI model. */
(function(root){
'use strict';
const requirements=[
 ['Prime identity','Identify the prime legal entity and authorized contact.','Required',4],
 ['Texas registration','Name the Texas-registered landscape architect responsible for landscape services.','Required',4],
 ['Three comparable projects','Provide exactly three comparable projects completed within the ten years before the response deadline.','Required',4],
 ['Public-sector coordination','At least one comparable project must demonstrate public-sector coordination.','Required',4],
 ['Complete discipline coverage','Landscape architecture, urban design, civil, hydrology/hydraulics, structural, ecology, lighting, cost estimating and engagement.','Required',3],
 ['Subconsultant structure','Disclose proposed subconsultants, responsibilities and discipline coverage.','Required',4],
 ['Cover letter','Identify prime and contact; accept the RFQ requirements. Maximum two pages.','Submission',5],
 ['Organization chart','Show the firm, team, discipline leads and consultant responsibilities.','Submission',5],
 ['Project sheets','Include scope, client, dates, construction-value basis and named team-member roles for the three projects.','Submission',5],
 ['Key-person resumes','Include principal-in-charge, project manager and discipline leads with current responsibilities and relevant work.','Submission',5],
 ['Project approach','Address public engagement, resilience, design coordination and cost control.','Submission',5],
 ['Schedule and availability','Provide milestones and January 2027 mobilization availability; identify competing commitments.','Submission',5],
 ['Disclosures and addenda','Provide conflicts, exceptions and acknowledgment of issued addenda. No addenda accompanied the initial issue.','Submission',5],
 ['Three client references','Give project connection and contact information for three client references.','Submission',5],
 ['Searchable PDF and page limit','One searchable PDF, maximum 30 counted pages. Only front cover, contents and addendum acknowledgments are excluded.','Format',5],
 ['File standards','US Letter, minimum 10-point body type, maximum 25 MB; filename CRCW_PrimeFirm_Qualifications.pdf.','Format',5],
 ['No pricing in qualifications','Do not include fees, hourly rates or pricing schedules. Compensation follows during negotiations.','Restriction',4]
].map((r,i)=>({id:'REQ-'+String(i+1).padStart(2,'0'),title:r[0],detail:r[1],type:r[2],page:r[3]}));
const deadlines=[
 {date:'2026-09-14',label:'RFQ issued',detail:'Initial issue'},
 {date:'2026-09-23',label:'Optional information session',detail:'10:00 AM CDT'},
 {date:'2026-09-30',label:'Written questions due',detail:'5:00 PM CDT'},
 {date:'2026-10-07',label:'Final addendum',detail:'Anticipated'},
 {date:'2026-10-16',label:'Qualifications due',detail:'2:00 PM CDT',primary:true},
 {date:'2026-10-30',label:'Shortlist notification',detail:'Anticipated'},
 {date:'2026-11-10',label:'Interviews',detail:'Anticipated · time to be confirmed'},
 {date:'2026-11',label:'Negotiations',detail:'November–December 2026'},
 {date:'2027-01',label:'Design mobilization',detail:'Anticipated · January 2027'}
];
const scores=[
 {id:'fit',label:'Project fit',short:'PROJECT FIT',value:94,confidence:'High',reason:'The opportunity combines the markets, services and geography in which Fieldwork has its strongest source-backed experience. The $72M program is larger than the three lead precedents, but its public-realm scope is closely aligned.',evidence:['Waterloo Commons: 14-acre Austin urban park; landscape architecture, urban design and engagement.','Eastline Greenway: City of Austin client, trails, ecology and municipal coordination.','Republic District Streetscape: Austin streetscape and accessible public-space experience.'],projects:['FW-P001','FW-P002','FW-P009'],sources:['projects','qualifications','rfq'],page:2,components:[['Market alignment',98],['Service alignment',96],['Geographic alignment',100],['Scale alignment',88],['Client alignment',91]]},
 {id:'experience',label:'Relevant experience',short:'EXPERIENCE',value:92,confidence:'High',reason:'The recommended three-project sequence demonstrates Austin public realm, ecological trail delivery and civic gathering space. Evidence should describe Fieldwork’s actual roles, with hydraulic and specialist work clearly attributed to others.',evidence:['Waterloo Commons — $48M delivered construction cost; completed 2023.','Eastline Greenway — $32M delivered construction cost; completed 2024.','Trinity Civic Plaza — $27M delivered construction cost; completed 2022.'],projects:['FW-P001','FW-P002','FW-P003'],sources:['projects','qualifications','rfq'],page:4},
 {id:'team',label:'Team strength',short:'TEAM',value:88,confidence:'High',reason:'Elena Marquez and Noah Williams bring direct involvement in the strongest comparable projects. Priya Shah provides a credible alternative PM option, with more available capacity but a different delivery record.',evidence:['Elena was principal-in-charge on Waterloo Commons and Trinity Civic Plaza, and stakeholder advisor on Eastline Greenway.','Noah was project manager on Waterloo Commons and Eastline Greenway.','Priya was project designer on Eastline Greenway; do not describe her as its PM.'],people:['FW-E001','FW-E004','FW-E005'],sources:['resumes','projects','staffing']},
 {id:'capacity',label:'Capacity',short:'CAPACITY',value:74,confidence:'Moderate',reason:'Fieldwork has room to pursue, but its preferred PM is heavily committed. Forecast availability improves at 60 days. The source forecast ends December 11, 2026; January 2027 capacity has not been confirmed.',evidence:['Noah: 91% allocated at September 12; 63% at November 11. That is 9% and 37% unallocated capacity.','Priya: 67% allocated currently; 54% at 60 days.','Firmwide allocation: 82% current, 84% at 30 days, 73% at 60 days, 68% at 90 days.'],people:['FW-E004','FW-E005'],sources:['staffing','rfq'],page:6},
 {id:'strategic',label:'Strategic alignment',short:'STRATEGIC',value:96,confidence:'High',reason:'The pursuit supports Fieldwork’s explicit 2027 priorities: major public realm, higher education and urban resilience. A substantial Texas civic landscape offers a strong design role and multi-phase work.',evidence:['2027 strategy: grow major public realm and urban resilience.','Preferred pursuits: Texas/Southwest, strong design role, multi-phase work and fees above approximately $500K.','The RFQ combines resilient landscape infrastructure, civic space, trails and ecological restoration.'],sources:['strategy','rfq'],page:2},
 {id:'financial',label:'Financial signals',short:'FINANCIAL',value:71,confidence:'Moderate',reason:'Comparable fees establish useful context, but do not establish this opportunity’s fee, staffing cost or margin. The indicative $1.4M–$2.2M range is a Product & UX demo assumption, not an RFQ allowance or a validated estimate.',evidence:['Waterloo Commons: $1.42M Fieldwork fee on $48M construction.','Eastline Greenway: $980K fee on $32M construction. Trinity Civic Plaza: $740K on $27M.','113 of 164 historical projects have fee data. The RFQ does not publish a design-fee budget.'],projects:['FW-P001','FW-P002','FW-P003'],sources:['projects','rfq','strategy'],page:7},
 {id:'risk',label:'Risk position',short:'RISK',value:79,confidence:'Moderate',reason:'The demo risk score uses a favorable direction: higher means fewer concerns. No critical firm-level qualification gap is apparent, but specialist commitments, future staffing and contract terms remain unresolved.',evidence:['No committed civil, hydraulic or other specialist consultants are recorded.','No draft agreement, design-fee allowance, survey or geotechnical reports accompanied the RFQ.','Confirm Noah’s availability before naming the final team.'],sources:['rfq','staffing'],page:7}
];
const pursuit={id:'pursuit',label:'Pursuit recommendation',value:87,confidence:'High',reason:'Fieldwork is exceptionally well positioned for this pursuit through relevant Austin public-realm work, municipal delivery and its 2027 priorities. Staffing and incomplete commercial information introduce manageable uncertainty. High confidence applies to this curated demo recommendation; individual financial and capacity signals remain moderate.',evidence:['Lead with Waterloo Commons and Eastline Greenway.','Resolve Noah’s capacity and retain Priya as the alternate PM.','Confirm specialist coverage and obtain commercial terms during negotiations.'],projects:['FW-P001','FW-P002','FW-P003'],sources:['projects','staffing','strategy','rfq']};
const selection=[['Comparable public-realm experience and delivery',30,'Strong','Lead with completed, relevant work.'],['Proposed team, roles and individual experience',25,'Strong','Prove the named team’s direct project roles.'],['Approach, resilience and engagement',25,'To develop','Write the project-specific approach.'],['Schedule, availability and delivery capacity',10,'To confirm','Resolve January commitments.'],['Texas municipal coordination and local context',10,'Very strong','Show Austin delivery evidence.']];
const risks=[
 {level:'Medium',title:'Preferred PM capacity',detail:'Noah is 91% allocated in the current snapshot. The 60-day forecast improves; January remains unconfirmed.',action:'Confirm leadership commitments before finalizing the team.',score:'capacity'},
 {level:'Medium',title:'Fee and contract uncertainty',detail:'No design-fee budget or draft agreement has been supplied. Project gross margin cannot yet be estimated.',action:'Clarify scope and commercial terms during negotiations.',score:'financial'},
 {level:'Low · unresolved',title:'Specialist consultant coverage',detail:'Civil, hydraulic, structural and other specialist capabilities require external coverage. No commitments are recorded.',action:'Name qualified consultants and confirm their availability.',score:'risk'},
 {level:'Low · monitor',title:'Procurement schedule',detail:'32 days from RFQ issue to submission. Anticipated interviews are November 10; negotiations follow in November–December.',action:'Track written addenda and protect proposal production time.',score:'risk'}
];
const sourceKeys={rfq:'Colorado_River_Civic_Waterfront_RFQ_2026.pdf',projects:'Fieldwork_Project_Database.xlsx',qualifications:'Fieldwork_Master_Qualifications_2026.pdf',resumes:'Fieldwork_Staff_Resumes.pdf',staffing:'Fieldwork_Staffing_September_2026.xlsx',strategy:'Fieldwork_2027_Strategic_Plan.pdf'};
function projectSignals(p){
 const text=[p.market,p.services,p.tags,p.description].filter(Boolean).join(' ').toLowerCase();
 return [p.city==='Austin'?'Austin':null,/public realm|urban park|civic/.test(text)?'Public realm':null,/municipal|city of/.test(text+' '+p.client.toLowerCase())?'Municipal':null,/ecolog|resilien|green infrastructure|flood/.test(text)?'Resilience / ecology':null,/engagement/.test(text)?'Engagement':null,p.status==='Completed'?'Completed':null].filter(Boolean);
}
function rankProjects(data){
 const lead=['FW-P001','FW-P002','FW-P003'];
 return data.projects.map(p=>({...p,signals:projectSignals(p)})).filter(p=>p.description&&p.signals.length>=3).sort((a,b)=>{
   const ai=lead.indexOf(a.id),bi=lead.indexOf(b.id);
   if(ai>=0||bi>=0)return (ai<0?100:ai)-(bi<0?100:bi);
   return b.signals.length-a.signals.length||a.id.localeCompare(b.id);
 }).slice(0,17);
}
function evaluatePeople(data){return data.people.map(p=>({...p,relationships:data.relationships.filter(r=>r.employee===p.id),available:p.alloc.map(v=>100-v)}));}
async function analyze(data,report,signal){
 const check=()=>{if(signal?.aborted)throw new DOMException('Cancelled','AbortError');};
 const yieldFrame=()=>new Promise(resolve=>{if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>requestAnimationFrame(resolve));else setTimeout(resolve,0);});
 const out={};
 const stages=[
  ['document',()=>{const source=data.sources.find(s=>s.file===sourceKeys.rfq);if(!source?.pages?.length)throw Error('Prepared RFQ source is missing.');out.pageCount=source.pages.length;return `${out.pageCount} RFQ pages indexed · original document linked`; }],
  ['requirements',()=>{out.requirements=requirements;if(requirements.some(r=>r.page>out.pageCount))throw Error('Requirement citation is invalid.');return `${requirements.length} source-linked requirements · October 16 deadline`; }],
  ['experience',()=>{out.projects=rankProjects(data);return `${data.projects.length} projects compared · ${out.projects.length} demo shortlist candidates`; }],
  ['people',()=>{out.people=evaluatePeople(data);return `${out.people.length} people evaluated · ${data.relationships.length} project-team relationships`; }],
  ['capacity',()=>{out.noah=out.people.find(p=>p.id==='FW-E004');out.priya=out.people.find(p=>p.id==='FW-E005');if(!out.noah||!out.priya)throw Error('Capacity records are missing.');return `PM constraint identified · Noah ${out.noah.alloc[0]}% allocated · January unconfirmed`; }],
  ['recommendation',()=>{out.recommendation=pursuit;return 'Evidence assembled · curated demo recommendation: PURSUE 87'; }]
 ];
 for(const [id,run] of stages){check();report({id,state:'running'});await yieldFrame();check();const message=run();report({id,state:'complete',message});await yieldFrame();}
 return out;
}
root.FIRM_INTELLIGENCE={requirements,deadlines,scores,pursuit,selection,risks,sourceKeys,rankProjects,evaluatePeople,projectSignals,analyze};
if(typeof module!=='undefined')module.exports=root.FIRM_INTELLIGENCE;
})(typeof window!=='undefined'?window:globalThis);
