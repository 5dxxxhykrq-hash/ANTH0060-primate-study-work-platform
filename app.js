(() => {
  const STORAGE_KEY = "anth0060-research-os-v1";
  const NAV = [
    ["dashboard","Dashboard"],
    ["weeks","Weeks"],
    ["assessment","Assessment"],
    ["tasks","Tasks"],
    ["readings","Readings"],
    ["research","Research Atlas"],
    ["project","Project Lab"],
    ["methods","Methods Toolkit"],
    ["taxa","Primate Atlas"],
    ["feedback","Feedback"]
  ];

  const defaultState = {
    route:"dashboard",
    selectedWeek:1,
    readingStatus:{},
    taskDone:{},
    customTasks:[],
    assessmentChecks:{},
    bibliography:[0,0,0,0,0],
    feedbackRounds:0,
    scores:{},
    projectIdeas:[],
    feedbackEntries:[],
    authorshipEntries:[],
    budgetRows:[
      {category:"Equipment", item:"", qty:1, unit:0, justification:""},
      {category:"Transport", item:"", qty:1, unit:0, justification:""}
    ],
    ethogram:[],
    confounds:{},
    calendar:[]
  };

  let state = loadState();
  const appEl = document.getElementById("app");
  const navEl = document.getElementById("mainNav");
  const titleEl = document.getElementById("sectionTitle");
  const eyebrowEl = document.getElementById("sectionEyebrow");

  function loadState(){
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {...defaultState, ...raw};
    } catch(e){ return structuredClone(defaultState); }
  }
  function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function esc(s=""){ return String(s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m])); }
  function toast(msg){
    const el=document.getElementById("toast");
    el.textContent=msg; el.classList.add("show");
    setTimeout(()=>el.classList.remove("show"),1800);
  }
  function setRoute(route){
    state.route=route; saveState();
    renderNav(); render();
    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function renderNav(){
    navEl.innerHTML = NAV.map(([id,label]) => `<button data-route="${id}" class="${state.route===id?"active":""}"><span class="dot"></span>${label}</button>`).join("");
    navEl.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>setRoute(b.dataset.route)));
  }
  function sectionTitle(route){
    const map={
      dashboard:["Research OS","Dashboard"],
      weeks:["Course","Weeks"],
      assessment:["Portfolio","Assessment"],
      tasks:["Workflow","Pre-seminar & submissions"],
      readings:["Literature","Course readings"],
      research:["Literature map","Research Atlas"],
      project:["Proposal development","Project Lab"],
      methods:["Research design","Methods Toolkit"],
      taxa:["Reference","Primate Atlas"],
      feedback:["Reflect portfolio","Feedback & authorship"]
    };
    return map[route] || map.dashboard;
  }

  const allReadings = () => COURSE.weeks.flatMap(w => (w.readings||[]).map(r=>({...r,week:w.week,weekTopic:w.topic})));
  const currentWeek = () => {
    const start = new Date("2026-10-08T00:00:00+01:00");
    const now = new Date();
    if(now < start) return 1;
    const w=Math.floor((now-start)/(7*24*60*60*1000))+1;
    return Math.min(10,Math.max(1,w));
  };
  const readingStatus=(id)=>state.readingStatus[id]||{read:false,annotated:false,note:""};
  function progressPct(done,total){ return total?Math.round(done/total*100):0; }
  function fmtMoney(n){ return new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(Number(n)||0); }

  async function loadCalendar(){
    try{
      const res=await fetch("data/calendar.json",{cache:"no-store"});
      if(res.ok){
        const data=await res.json();
        state.calendar=Array.isArray(data.events)?data.events:[];
        saveState();
      }
    }catch(e){}
  }

  function render(){
    const [eyebrow,title]=sectionTitle(state.route);
    eyebrowEl.textContent=eyebrow; titleEl.textContent=title;
    const renderers={
      dashboard:renderDashboard, weeks:renderWeeks, assessment:renderAssessment,
      tasks:renderTasks, readings:renderReadings, research:renderResearch,
      project:renderProject, methods:renderMethods, taxa:renderTaxa, feedback:renderFeedback
    };
    (renderers[state.route]||renderDashboard)();
  }

  function renderDashboard(){
    const week=currentWeek();
    const readings=allReadings();
    const readCount=readings.filter(r=>readingStatus(r.id).read).length;
    const annCount=readings.filter(r=>readingStatus(r.id).annotated).length;
    const assessmentDone=COURSE.assessment.first.filter((_,i)=>state.assessmentChecks["first-"+i]).length;
    const tasks = collectTasks().filter(t=>!state.taskDone[t.id]);
    const weekObj=COURSE.weeks.find(w=>w.week===week)||COURSE.weeks[0];
    const calendar = (state.calendar||[]).filter(e=>JSON.stringify(e).toUpperCase().includes("ANTH0060")).slice(0,4);
    appEl.innerHTML=`
      <section class="hero">
        <div class="hero-card">
          <div>
            <div class="eyebrow" style="color:#b9ccbf">UCL · PG · 2026/27</div>
            <h2>Primate Behaviour & Ecology Research OS</h2>
            <p>One place for weekly readings, seminar preparation, the First-contract portfolio, annotated bibliography, project design, methods and feedback.</p>
          </div>
          <div class="hero-meta">
            <span>Current focus: Week ${week} · ${esc(weekObj.topic)}</span>
            <span>Contract target: First · 75</span>
            <span>Method feedback: ${state.feedbackRounds}/2 used</span>
          </div>
        </div>
        <div class="card">
          <div class="eyebrow">Assessment risk control</div>
          <h3 style="margin:7px 0 12px">First contract</h3>
          <div class="metric"><div><div class="value">${progressPct(assessmentDone,COURSE.assessment.first.length)}%</div><div class="label">${assessmentDone}/${COURSE.assessment.first.length} hard requirements checked</div></div></div>
          <div class="progress" style="margin:12px 0 14px"><span style="width:${progressPct(assessmentDone,COURSE.assessment.first.length)}%"></span></div>
          <div class="alert ${state.feedbackRounds>=2?"danger":"warn"}">Two methodology feedback rounds only. A weak submission can still consume a round.</div>
        </div>
      </section>

      <div class="grid four">
        ${metricCard("Course readings",readCount+"/"+readings.length,progressPct(readCount,readings.length)+"% read")}
        ${metricCard("Annotated course readings",annCount+"/"+readings.length,"Separate from the 25-paper contract minimum")}
        ${metricCard("Annotated bibliography",state.bibliography.reduce((a,b)=>a+(Number(b)||0),0)+"/25","First-contract minimum")}
        ${metricCard("Open tasks",tasks.length,"Built-in + your Moodle tasks")}
      </div>

      <div class="section-head"><div><h2>This week</h2><p>Week ${week}: ${esc(weekObj.topic)}</p></div><button class="btn secondary" data-go-week="${week}">Open Week ${week}</button></div>
      <div class="grid two">
        <div class="card">
          <h3 class="card-title">Next teaching information</h3>
          <div class="list" style="margin-top:10px">
            ${calendar.length ? calendar.map(e=>`<div class="list-row"><div><strong>${esc(e.summary||"ANTH0060")}</strong><div class="mini">${esc(e.start||"")} · ${esc(e.location||"Room not listed")}</div></div><span class="source-badge">${esc(e.source||"Calendar")}</span></div>`).join("") :
              (weekObj.sessions||[]).map(s=>`<div class="list-row"><div><strong>${esc(s.type)} · ${esc(s.time)}</strong><div class="mini">${esc(s.note)}</div></div><span class="source-badge">Confirmed email</span></div>`).join("") || `<div class="empty">No ANTH0060 calendar data synced yet. The repository is ready for the private iCalendar secret.</div>`
            }
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">Do not miss</h3>
          <div class="list" style="margin-top:10px">
            ${tasks.slice(0,6).map(t=>`<div class="list-row"><div><strong>W${t.week} · ${esc(t.title)}</strong><div class="mini">${esc(t.type)} · ${esc(t.source||"Course")}${t.deadline?" · "+esc(t.deadline):""}</div></div><span class="status pending">Open</span></div>`).join("") || `<div class="empty">No open tasks.</div>`}
          </div>
        </div>
      </div>

      <div class="section-head"><div><h2>Course concept map</h2><p>The intellectual spine of the module</p></div></div>
      <div class="concept-map">
        ${[
          ["W2","Taxonomy"],["W3","Socio-ecology"],["W4","Sex constraints"],["W5","Aggression"],
          ["W7","Life history"],["W8","Conservation"],["W9","Cognition"],["W10","Culture"]
        ].map((n,i)=>`${i?'<span class="concept-arrow">→</span>':''}<div class="concept-node"><span class="mini">${n[0]}</span><br><strong>${n[1]}</strong></div>`).join("")}
      </div>

      <div class="section-head"><div><h2>Source of truth</h2><p>The site distinguishes official course data from supplementary research.</p></div></div>
      <div class="grid three">
        ${COURSE.meta.sourceOrder.slice(0,6).map((s,i)=>`<div class="card"><span class="pill">Priority ${i+1}</span><h3 style="margin:10px 0 0">${esc(s)}</h3></div>`).join("")}
      </div>
    `;
    appEl.querySelector("[data-go-week]")?.addEventListener("click",e=>{state.selectedWeek=Number(e.currentTarget.dataset.goWeek);saveState();setRoute("weeks");});
  }

  function metricCard(label,value,sub){
    return `<div class="card"><div class="metric"><div><div class="value">${esc(value)}</div><div class="label">${esc(label)}</div></div></div><div class="mini" style="margin-top:10px">${esc(sub)}</div></div>`;
  }

  function renderWeeks(){
    const week=COURSE.weeks.find(w=>w.week===state.selectedWeek)||COURSE.weeks[0];
    const tasks=collectTasks().filter(t=>t.week===week.week);
    appEl.innerHTML=`
      <div class="week-tabs">
        ${COURSE.weeks.map(w=>`<button data-week="${w.week}" class="${w.week===state.selectedWeek?"active":""}">W${w.week} · ${esc(w.topic)}</button>`).join("")}
      </div>
      <div class="week-layout">
        <div>
          <div class="card">
            <div class="eyebrow">Week ${week.week}</div>
            <h2 style="margin:6px 0">${esc(week.topic)}</h2>
            <p class="muted" style="line-height:1.6">${esc(week.concept||"")}</p>
            <div class="link-list">
              <a class="btn secondary tiny" target="_blank" rel="noreferrer" href="${COURSE.meta.talis}">UCL/Talis ↗</a>
              <span class="source-badge">Moodle/Talis = official reading source</span>
            </div>
          </div>

          <div class="section-head"><div><h2>Readings</h2><p>${(week.readings||[]).length} confirmed course readings</p></div></div>
          <div class="grid">
            ${(week.readings||[]).length ? week.readings.map(readingCard).join("") : `<div class="empty">${week.week===6?"Reading Week — consolidate the bibliography and develop the proposal.":"No reading PDFs have been seeded for this week."}</div>`}
          </div>
        </div>

        <aside>
          <div class="card">
            <h3 class="card-title">Teaching</h3>
            <div class="list" style="margin-top:10px">
              ${(week.sessions||[]).map(s=>`<div class="list-row"><div><strong>${esc(s.type)} · ${esc(s.time)}</strong><div class="mini">${esc(s.note)}</div></div></div>`).join("") || `<div class="empty">Time/room will appear when the UCL calendar sync contains ANTH0060.</div>`}
            </div>
          </div>
          <div class="card" style="margin-top:16px">
            <h3 class="card-title">Pre-seminar & submissions</h3>
            <div style="margin-top:8px">
              ${tasks.length?tasks.map(taskRow).join(""):`<div class="empty">No tasks logged yet. Add Moodle instructions in the Tasks page.</div>`}
            </div>
            <button class="btn secondary tiny" style="margin-top:12px" id="addTaskFromWeek">Add a Week ${week.week} task</button>
          </div>
        </aside>
      </div>
    `;
    appEl.querySelectorAll("[data-week]").forEach(b=>b.addEventListener("click",()=>{state.selectedWeek=Number(b.dataset.week);saveState();renderWeeks();}));
    bindReadingCards();
    bindTaskRows();
    document.getElementById("addTaskFromWeek")?.addEventListener("click",()=>{state.route="tasks";saveState();renderNav();render();});
  }

  function readingCard(r){
    const s=readingStatus(r.id);
    return `<article class="reading-card" data-reading="${r.id}">
      <div class="reading-top">
        <div>
          <div class="authors">${esc(r.authors)} · ${r.year}</div>
          <h3>${esc(r.title)}</h3>
          <div class="mini" style="margin-top:5px">${esc(r.journal||"")}</div>
        </div>
        <span class="status ${s.read?"ok":"pending"}">${s.read?"Read":"Unread"}</span>
      </div>
      <div class="summary">${esc(r.finding)}</div>
      <div class="link-list">${(r.tags||[]).slice(0,5).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="actions">
        <button class="btn tiny" data-detail="${r.id}">Open notes</button>
        <label class="ghost small"><input type="checkbox" data-read="${r.id}" ${s.read?"checked":""}> Read</label>
        <label class="ghost small"><input type="checkbox" data-ann="${r.id}" ${s.annotated?"checked":""}> Annotated</label>
        <a class="ghost small" target="_blank" rel="noreferrer" href="${COURSE.meta.talis}">UCL/Talis ↗</a>
        ${r.doi?`<a class="ghost small" target="_blank" rel="noreferrer" href="https://doi.org/${encodeURIComponent(r.doi)}">DOI ↗</a>`:""}
        ${r.oa?`<a class="ghost small" target="_blank" rel="noreferrer" href="${r.oa}">Open access ↗</a>`:""}
      </div>
    </article>`;
  }
  function bindReadingCards(){
    appEl.querySelectorAll("[data-read]").forEach(el=>el.addEventListener("change",e=>{
      const id=e.target.dataset.read; state.readingStatus[id]={...readingStatus(id),read:e.target.checked};saveState();render();
    }));
    appEl.querySelectorAll("[data-ann]").forEach(el=>el.addEventListener("change",e=>{
      const id=e.target.dataset.ann; state.readingStatus[id]={...readingStatus(id),annotated:e.target.checked};saveState();render();
    }));
    appEl.querySelectorAll("[data-detail]").forEach(el=>el.addEventListener("click",()=>openReading(el.dataset.detail)));
  }
  function openReading(id){
    const r=allReadings().find(x=>x.id===id); if(!r)return;
    const st=readingStatus(id);
    openModal(`
      <div class="eyebrow">Week ${r.week} · ${esc(r.weekTopic)}</div>
      <h2>${esc(r.title)}</h2>
      <p class="muted">${esc(r.authors)} · ${r.year} · ${esc(r.journal||"")}</p>
      <div class="grid two">
        <div class="card"><div class="eyebrow">Question</div><p>${esc(r.question)}</p></div>
        <div class="card"><div class="eyebrow">Method</div><p>${esc(r.method)}</p></div>
        <div class="card"><div class="eyebrow">Finding</div><p>${esc(r.finding)}</p></div>
        <div class="card"><div class="eyebrow">Project use</div><p>${esc(r.use)}</p></div>
      </div>
      <div class="section-head"><div><h2>My note</h2><p>Stored only in this browser unless exported.</p></div></div>
      <textarea id="readingNote" placeholder="Critical note, limitation, connection, possible project use...">${esc(st.note||"")}</textarea>
      <div class="link-list" style="margin-top:12px">
        <button class="btn" id="saveReadingNote">Save note</button>
        <a class="ghost" target="_blank" rel="noreferrer" href="${COURSE.meta.talis}">UCL/Talis ↗</a>
        ${r.doi?`<a class="ghost" target="_blank" rel="noreferrer" href="https://doi.org/${encodeURIComponent(r.doi)}">Publisher / DOI ↗</a>`:""}
        ${r.oa?`<a class="ghost" target="_blank" rel="noreferrer" href="${r.oa}">Open access ↗</a>`:""}
      </div>
      <div class="alert info" style="margin-top:16px">The public repository intentionally does not host UCL subscription PDFs. Keep licensed PDFs in your private study environment.</div>
    `);
    document.getElementById("saveReadingNote").addEventListener("click",()=>{
      state.readingStatus[id]={...readingStatus(id),note:document.getElementById("readingNote").value};saveState();toast("Reading note saved");
    });
  }

  function renderAssessment(){
    const firstDone=COURSE.assessment.first.filter((_,i)=>state.assessmentChecks["first-"+i]).length;
    const bibTotal=state.bibliography.reduce((a,b)=>a+(Number(b)||0),0);
    const scoreTotal=COURSE.assessment.criteria.reduce((sum,c,i)=>sum+Math.min(c.max,Number(state.scores[i]||0)),0);
    appEl.innerHTML=`
      <div class="grid two">
        <div class="card">
          <div class="eyebrow">100% of module mark</div>
          <h2>Reflect Project Proposal Portfolio</h2>
          <p class="muted">${esc(COURSE.assessment.summary)}</p>
          <div class="grid two">
            ${COURSE.assessment.portfolioPages.map(p=>`<div class="sticky-note"><strong>${esc(p.name)}</strong><div class="mini" style="margin-top:6px">${esc(p.detail)}</div></div>`).join("")}
          </div>
        </div>
        <div class="card">
          <div class="eyebrow">Contract target</div>
          <h2>First · 75</h2>
          <div class="metric"><div><div class="value">${firstDone}/${COURSE.assessment.first.length}</div><div class="label">Hard requirements checked</div></div></div>
          <div class="progress" style="margin:12px 0"><span style="width:${progressPct(firstDone,COURSE.assessment.first.length)}%"></span></div>
          <div class="alert danger">Week 7 is the contract checkpoint. After lock-in, missing contracted work can result in 45 rather than an automatic lower band.</div>
        </div>
      </div>

      <div class="section-head"><div><h2>First-contract hard requirements</h2><p>Process obligations, not just final-writing quality.</p></div></div>
      <div class="card">
        ${COURSE.assessment.first.map((t,i)=>`<label class="checkline list-row"><input type="checkbox" data-first="${i}" ${state.assessmentChecks["first-"+i]?"checked":""}><span><strong>${esc(t)}</strong></span></label>`).join("")}
      </div>

      <div class="section-head"><div><h2>Annotated bibliography tracker</h2><p>Minimum 5 papers × 5 topic weeks = 25 for the First contract.</p></div><span class="pill">${bibTotal}/25</span></div>
      <div class="grid five" style="display:grid;grid-template-columns:repeat(5,minmax(110px,1fr));gap:12px">
        ${state.bibliography.map((v,i)=>`<div class="card"><div class="field"><label>Topic week ${i+1}</label><input type="number" min="0" data-bib="${i}" value="${Number(v)||0}"></div><div class="progress" style="margin-top:10px"><span style="width:${Math.min(100,(Number(v)||0)/5*100)}%"></span></div></div>`).join("")}
      </div>

      <div class="section-head"><div><h2>Methodology feedback</h2><p>Satisfactory does not mean easy: gap, precedent, limitations, confounds and controls must be thought through.</p></div></div>
      <div class="grid two">
        <div class="card">
          <div class="metric"><div><div class="value">${state.feedbackRounds}/2</div><div class="label">Feedback rounds used</div></div></div>
          <div class="link-list" style="margin-top:12px">
            <button class="btn secondary" data-round="-1">−</button>
            <button class="btn" data-round="1">Use one round</button>
          </div>
        </div>
        <div class="alert ${state.feedbackRounds>=2?"danger":"warn"}">
          Do not outsource the design thinking. A submission returned as “needs improvement” can still count as one of the two rounds.
        </div>
      </div>

      <div class="section-head"><div><h2>75 → 85 quality tracker</h2><p>Self-audit against the marking sheet. This does not calculate the official mark.</p></div><span class="pill">Self-score ${scoreTotal}/85</span></div>
      <div class="card table-wrap">
        <table><thead><tr><th>Group</th><th>Criterion</th><th>Max</th><th>Self-score</th></tr></thead>
        <tbody>${COURSE.assessment.criteria.map((c,i)=>`<tr><td>${esc(c.group)}</td><td>${esc(c.name)}</td><td>${c.max}</td><td><input style="width:70px" type="number" min="0" max="${c.max}" data-score="${i}" value="${state.scores[i]??""}"></td></tr>`).join("")}</tbody></table>
      </div>

      <div class="section-head"><div><h2>Contract rules</h2></div></div>
      <div class="grid two">${COURSE.assessment.rules.map(r=>`<div class="callout">${esc(r)}</div>`).join("")}</div>
    `;
    appEl.querySelectorAll("[data-first]").forEach(el=>el.addEventListener("change",e=>{state.assessmentChecks["first-"+e.target.dataset.first]=e.target.checked;saveState();renderAssessment();}));
    appEl.querySelectorAll("[data-bib]").forEach(el=>el.addEventListener("change",e=>{state.bibliography[Number(e.target.dataset.bib)]=Math.max(0,Number(e.target.value)||0);saveState();renderAssessment();}));
    appEl.querySelectorAll("[data-round]").forEach(el=>el.addEventListener("click",e=>{state.feedbackRounds=Math.max(0,Math.min(2,state.feedbackRounds+Number(e.currentTarget.dataset.round)));saveState();renderAssessment();}));
    appEl.querySelectorAll("[data-score]").forEach(el=>el.addEventListener("change",e=>{const i=Number(e.target.dataset.score),max=COURSE.assessment.criteria[i].max;state.scores[i]=Math.max(0,Math.min(max,Number(e.target.value)||0));saveState();renderAssessment();}));
  }

  function collectTasks(){
    const built=COURSE.weeks.flatMap(w=>(w.tasks||[]).map((t,i)=>({id:`builtin-${w.week}-${i}`,week:w.week,...t})));
    return [...built,...state.customTasks];
  }
  function taskRow(t){
    return `<div class="task-row" data-taskrow="${t.id}">
      <input type="checkbox" data-task="${t.id}" ${state.taskDone[t.id]?"checked":""}>
      <div><strong>${esc(t.title)}</strong><div class="task-meta"><span class="tag">${esc(t.type||"Task")}</span><span class="source-badge">${esc(t.source||"Moodle")}</span>${t.submit?'<span class="status risk">Submit</span>':''}${t.deadline?`<span class="tag">${esc(t.deadline)}</span>`:""}</div></div>
      ${String(t.id).startsWith("custom-")?`<button class="ghost small" data-delete-task="${t.id}">Delete</button>`:""}
    </div>`;
  }
  function bindTaskRows(){
    appEl.querySelectorAll("[data-task]").forEach(el=>el.addEventListener("change",e=>{state.taskDone[e.target.dataset.task]=e.target.checked;saveState();render();}));
    appEl.querySelectorAll("[data-delete-task]").forEach(el=>el.addEventListener("click",e=>{state.customTasks=state.customTasks.filter(t=>t.id!==e.currentTarget.dataset.deleteTask);delete state.taskDone[e.currentTarget.dataset.deleteTask];saveState();render();}));
  }

  function renderTasks(){
    const tasks=collectTasks().sort((a,b)=>a.week-b.week);
    appEl.innerHTML=`
      <div class="grid two">
        <div class="card">
          <h2>Add Moodle / pre-seminar task</h2>
          <div class="form-grid">
            <div class="field"><label>Week</label><select id="taskWeek">${COURSE.weeks.map(w=>`<option value="${w.week}" ${w.week===state.selectedWeek?"selected":""}>Week ${w.week}</option>`).join("")}</select></div>
            <div class="field"><label>Type</label><select id="taskType"><option>Pre-seminar</option><option>Moodle submission</option><option>Reading</option><option>Taxon handout</option><option>Formative assessment</option><option>Seminar</option><option>Other</option></select></div>
            <div class="field full"><label>Task</label><input id="taskTitle" placeholder="e.g. Submit draft title + research question"></div>
            <div class="field"><label>Deadline / timing</label><input id="taskDeadline" placeholder="e.g. Wed 23:59"></div>
            <div class="field"><label>Source</label><select id="taskSource"><option>Moodle</option><option>Email</option><option>Talis</option><option>Lecture</option><option>Seminar</option></select></div>
            <div class="field"><label>Submission required?</label><select id="taskSubmit"><option value="no">No</option><option value="yes">Yes</option></select></div>
            <div class="field"><label>Link (optional)</label><input id="taskLink" placeholder="Moodle activity link"></div>
          </div>
          <button class="btn" style="margin-top:12px" id="addTaskBtn">Add task</button>
        </div>
        <div class="card">
          <h2>Task logic</h2>
          <div class="callout">Formal Moodle deadlines may later sync automatically through a private calendar feed. Narrative instructions still need to be logged from the weekly Moodle page.</div>
          <div class="divider"></div>
          <div class="mini">Recommended evidence fields after submission: status, submitted date, Moodle link and a private screenshot/receipt kept outside this public repository.</div>
        </div>
      </div>
      <div class="section-head"><div><h2>All course tasks</h2><p>${tasks.filter(t=>!state.taskDone[t.id]).length} open</p></div></div>
      <div class="card">${tasks.length?tasks.map(taskRow).join(""):'<div class="empty">No tasks logged.</div>'}</div>
    `;
    bindTaskRows();
    document.getElementById("addTaskBtn").addEventListener("click",()=>{
      const title=document.getElementById("taskTitle").value.trim(); if(!title){toast("Add a task title");return;}
      state.customTasks.push({
        id:"custom-"+Date.now(),week:Number(document.getElementById("taskWeek").value),
        type:document.getElementById("taskType").value,title,
        deadline:document.getElementById("taskDeadline").value.trim(),
        source:document.getElementById("taskSource").value,
        submit:document.getElementById("taskSubmit").value==="yes",
        link:document.getElementById("taskLink").value.trim()
      });
      saveState();toast("Task added");renderTasks();
    });
  }

  function renderReadings(){
    appEl.innerHTML=`
      <div class="card">
        <div class="section-head" style="margin:0 0 12px"><div><h2>Reading database</h2><p>Confirmed PDFs supplied for Weeks 2–5 and 7–10.</p></div></div>
        <div class="filters">
          <input id="readSearch" placeholder="Search title, author, topic or tag">
          <select id="readWeek"><option value="">All weeks</option>${COURSE.weeks.map(w=>`<option value="${w.week}">Week ${w.week}</option>`).join("")}</select>
          <select id="readStatus"><option value="">Any status</option><option value="unread">Unread</option><option value="read">Read</option><option value="annotated">Annotated</option></select>
        </div>
      </div>
      <div class="section-head"><div><h2 id="readCountHeading">Course readings</h2><p>Use “Open notes” for question → method → finding → project-use structure.</p></div></div>
      <div class="grid" id="readingGrid"></div>
    `;
    const refresh=()=>{
      const q=document.getElementById("readSearch").value.toLowerCase();
      const w=document.getElementById("readWeek").value;
      const st=document.getElementById("readStatus").value;
      const items=allReadings().filter(r=>{
        const blob=[r.title,r.authors,r.weekTopic,...(r.tags||[])].join(" ").toLowerCase();
        const rs=readingStatus(r.id);
        return (!q||blob.includes(q))&&(!w||String(r.week)===w)&&(!st||(st==="read"&&rs.read)||(st==="unread"&&!rs.read)||(st==="annotated"&&rs.annotated));
      });
      document.getElementById("readingGrid").innerHTML=items.length?items.map(readingCard).join(""):'<div class="empty">No readings match the filters.</div>';
      document.getElementById("readCountHeading").textContent=`Course readings · ${items.length}`;
      bindReadingCards();
    };
    ["readSearch","readWeek","readStatus"].forEach(id=>document.getElementById(id).addEventListener(id==="readSearch"?"input":"change",refresh));
    refresh();
  }

  function renderResearch(){
    appEl.innerHTML=`
      <div class="card">
        <div class="eyebrow">Literature-review layer</div>
        <h2>Research Atlas</h2>
        <p class="muted">Use the course readings as anchors, then expand outward into foundational literature, recent frontiers, other taxa and methods. External papers are supplementary rather than official course readings.</p>
      </div>
      <div class="section-head"><div><h2>Fields & open questions</h2></div></div>
      <div class="grid two">
        ${COURSE.researchAtlas.map(a=>`<article class="atlas-card"><div class="eyebrow">Research field</div><h3>${esc(a.name)}</h3><p><strong>Core question.</strong> ${esc(a.question)}</p><p class="muted"><strong>Frontier.</strong> ${esc(a.frontier)}</p><div class="link-list">${a.seeds.map(s=>`<a class="ghost small" target="_blank" rel="noreferrer" href="${s.url}">${esc(s.label)} ↗</a>`).join("")}</div></article>`).join("")}
      </div>
      <div class="section-head"><div><h2>Literature mapping</h2><p>Move from seed paper → neighbourhood → field structure.</p></div></div>
      <div class="grid three">
        ${COURSE.methods.external.filter(x=>["VOSviewer","ResearchRabbit","Connected Papers"].includes(x.name)).map(x=>`<div class="tool-card"><h3>${x.name}</h3><p>${esc(x.description)}</p><a class="btn secondary" target="_blank" rel="noreferrer" href="${x.url}">Launch ${x.name} ↗</a></div>`).join("")}
      </div>
      <div class="section-head"><div><h2>Literature matrix</h2><p>A proposal bibliography should reach beyond “papers about my species”.</p></div></div>
      <div class="grid three">
        ${[
          ["Primatological literature","What has already been tested in primates?"],
          ["Other taxa","Does another animal system clarify mechanism or theory?"],
          ["Study species","What biology, ecology and life history constrain the design?"],
          ["Methodology","How have others operationalised and measured the phenomenon?"],
          ["Budget sources","What does each field component realistically cost?"],
          ["Gap evidence","Is the gap real, current and important—not just 'nobody studied species X'?"]
        ].map(x=>`<div class="card"><h3 class="card-title">${x[0]}</h3><p class="muted">${x[1]}</p></div>`).join("")}
      </div>
    `;
  }

  function renderProject(){
    appEl.innerHTML=`
      <div class="grid two">
        <div class="card">
          <h2>New project idea</h2>
          <div class="form-grid">
            <div class="field full"><label>Phenomenon / observation</label><input id="ideaPhen" placeholder="e.g. structured vocal turn-taking in marmosets"></div>
            <div class="field full"><label>What is already known?</label><textarea id="ideaKnown"></textarea></div>
            <div class="field full"><label>Literature gap</label><textarea id="ideaGap"></textarea></div>
            <div class="field full"><label>Research question</label><input id="ideaRQ" placeholder="Does X affect Y in population Z?"></div>
            <div class="field"><label>Hypothesis / competing explanation</label><textarea id="ideaHyp"></textarea></div>
            <div class="field"><label>Prediction</label><textarea id="ideaPred"></textarea></div>
            <div class="field"><label>Independent variable</label><input id="ideaIV"></div>
            <div class="field"><label>Dependent variable</label><input id="ideaDV"></div>
            <div class="field full"><label>Method sketch</label><textarea id="ideaMethod"></textarea></div>
            <div class="field full"><label>Confounds / controls</label><textarea id="ideaConf"></textarea></div>
          </div>
          <button class="btn" id="saveIdea" style="margin-top:12px">Save project idea</button>
        </div>
        <div class="card">
          <h2>Proposal pipeline</h2>
          <div class="timeline">
            ${["Observation / phenomenon","Existing literature","Competing explanations","Literature gap","Research question","Hypothesis & predictions","Variables & operationalisation","Method","Confounds & controls","Feasibility","Budget","Feedback & revision"].map(x=>`<div class="timeline-item"><h4>${x}</h4></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="section-head"><div><h2>Idea bank</h2><p>Keep multiple candidates alive until the literature and feasibility are clearer.</p></div></div>
      <div class="grid two">
        ${state.projectIdeas.length?state.projectIdeas.map(i=>`<div class="idea-card"><div class="eyebrow">Project idea</div><h4>${esc(i.rq||i.phenomenon||"Untitled idea")}</h4><div class="kv"><div>Phenomenon</div><div>${esc(i.phenomenon)}</div><div>Gap</div><div>${esc(i.gap)}</div><div>Hypothesis</div><div>${esc(i.hypothesis)}</div><div>Variables</div><div>${esc(i.iv)} → ${esc(i.dv)}</div><div>Method</div><div>${esc(i.method)}</div></div><button class="ghost small" data-del-idea="${i.id}" style="margin-top:10px">Delete</button></div>`).join(""):'<div class="empty">No project ideas saved yet.</div>'}
      </div>
    `;
    document.getElementById("saveIdea").addEventListener("click",()=>{
      const idea={
        id:Date.now(),phenomenon:val("ideaPhen"),known:val("ideaKnown"),gap:val("ideaGap"),rq:val("ideaRQ"),
        hypothesis:val("ideaHyp"),prediction:val("ideaPred"),iv:val("ideaIV"),dv:val("ideaDV"),method:val("ideaMethod"),confounds:val("ideaConf")
      };
      if(!idea.phenomenon&&!idea.rq){toast("Add a phenomenon or research question");return;}
      state.projectIdeas.unshift(idea);saveState();toast("Project idea saved");renderProject();
    });
    appEl.querySelectorAll("[data-del-idea]").forEach(b=>b.addEventListener("click",()=>{state.projectIdeas=state.projectIdeas.filter(i=>String(i.id)!==b.dataset.delIdea);saveState();renderProject();}));
  }

  function renderMethods(){
    appEl.innerHTML=`
      <div class="card">
        <div class="eyebrow">Learn → design → calculate → export → use</div>
        <h2>Methods Toolkit</h2>
        <p class="muted">Built-in tools support your own research design. They do not replace the thinking required for a satisfactory methodology.</p>
      </div>

      <div class="section-head"><div><h2>External research tools</h2><p>Direct launch points</p></div></div>
      <div class="grid four">
        ${COURSE.methods.external.map(x=>`<div class="tool-card"><h3>${x.name}</h3><p>${esc(x.description)}</p><a class="btn secondary" target="_blank" rel="noreferrer" href="${x.url}">Launch ↗</a></div>`).join("")}
      </div>

      <div class="section-head"><div><h2>Sampling methods</h2></div></div>
      <div class="grid three">${COURSE.methods.sampling.map(m=>`<div class="card"><h3 class="card-title">${esc(m.name)}</h3><p><strong>Best for:</strong> ${esc(m.best)}</p><p class="muted"><strong>Watch:</strong> ${esc(m.caution)}</p></div>`).join("")}</div>

      <div class="section-head"><div><h2>Built-in design tools</h2></div></div>
      <div class="tool-grid">
        ${scheduleTool()}
        ${effortTool()}
        ${budgetTool()}
        ${ethogramTool()}
        ${confoundTool()}
      </div>
    `;
    bindScheduleTool();bindEffortTool();bindBudgetTool();bindEthogramTool();bindConfoundTool();
  }

  function scheduleTool(){
    return `<div class="tool-card"><h3>Observation Schedule Generator</h3><p>Generate a balanced focal-sampling plan across individuals and days.</p>
      <div class="field"><label>Individuals (comma separated)</label><input id="schedIndividuals" value="A,B,C,D,E,F"></div>
      <div class="form-grid" style="margin-top:8px"><div class="field"><label>Days</label><input id="schedDays" type="number" min="1" value="3"></div><div class="field"><label>Focal duration (min)</label><input id="schedDur" type="number" min="1" value="10"></div><div class="field"><label>Start time</label><input id="schedStart" type="time" value="09:00"></div><div class="field"><label>Sessions/day</label><input id="schedSessions" type="number" min="1" value="12"></div></div>
      <button class="btn tiny" id="generateSchedule" style="margin-top:10px">Generate</button><div id="scheduleOut" class="tool-output">No schedule generated yet.</div></div>`;
  }
  function bindScheduleTool(){
    document.getElementById("generateSchedule").addEventListener("click",()=>{
      const inds=val("schedIndividuals").split(",").map(x=>x.trim()).filter(Boolean),days=Number(val("schedDays"))||1,dur=Number(val("schedDur"))||10,sessions=Number(val("schedSessions"))||1;
      if(!inds.length)return;
      const [h,m]=val("schedStart").split(":").map(Number); let lines=[],idx=0;
      for(let d=1;d<=days;d++){lines.push(`Day ${d}`);for(let s=0;s<sessions;s++){const mins=h*60+m+s*dur;const hh=String(Math.floor(mins/60)%24).padStart(2,"0"),mm=String(mins%60).padStart(2,"0");lines.push(`${hh}:${mm}  ${inds[idx++%inds.length]}`);}lines.push("");}
      document.getElementById("scheduleOut").textContent=lines.join("\n");
    });
  }

  function effortTool(){
    return `<div class="tool-card"><h3>Sampling Effort Calculator</h3><p>Calculate focal hours and total field observation effort.</p>
      <div class="form-grid"><div class="field"><label>Individuals</label><input id="effInd" type="number" min="1" value="8"></div><div class="field"><label>Sessions / individual</label><input id="effSes" type="number" min="1" value="12"></div><div class="field"><label>Minutes / focal</label><input id="effMin" type="number" min="1" value="10"></div><div class="field"><label>Field days</label><input id="effDays" type="number" min="1" value="20"></div><div class="field"><label>Field hours / day</label><input id="effHours" type="number" min="0" step=".5" value="5"></div></div>
      <button class="btn tiny" id="calcEffort" style="margin-top:10px">Calculate</button><div id="effortOut" class="tool-output">No calculation yet.</div></div>`;
  }
  function bindEffortTool(){
    document.getElementById("calcEffort").addEventListener("click",()=>{
      const n=+val("effInd"),s=+val("effSes"),min=+val("effMin"),days=+val("effDays"),h=+val("effHours");
      const sessions=n*s,focal=sessions*min/60,total=days*h,share=total?focal/total*100:0;
      document.getElementById("effortOut").textContent=`Total focal sessions: ${sessions}\nFocal observation: ${focal.toFixed(1)} h\nTotal field effort: ${total.toFixed(1)} h\nFocal share of field time: ${share.toFixed(1)}%`;
    });
  }

  function budgetTool(){
    const rows=state.budgetRows.map((r,i)=>`<tr><td><select data-budget-cat="${i}"><option ${r.category==="Equipment"?"selected":""}>Equipment</option><option ${r.category==="Transport"?"selected":""}>Transport</option><option ${r.category==="Accommodation"?"selected":""}>Accommodation</option><option ${r.category==="Personnel"?"selected":""}>Personnel</option><option ${r.category==="Other"?"selected":""}>Other</option></select></td><td><input data-budget-item="${i}" value="${esc(r.item)}"></td><td><input data-budget-qty="${i}" type="number" min="0" step="1" value="${r.qty}"></td><td><input data-budget-unit="${i}" type="number" min="0" step=".01" value="${r.unit}"></td><td><input data-budget-just="${i}" value="${esc(r.justification)}"></td><td><button class="ghost small" data-budget-del="${i}">×</button></td></tr>`).join("");
    return `<div class="tool-card" style="grid-column:1/-1"><h3>Budget Builder</h3><p>Calculate costs while preserving the justification for every item. The current 26/27 budget ceiling is intentionally not hard-coded until Moodle confirms it.</p>
      <div class="table-wrap"><table><thead><tr><th>Category</th><th>Item</th><th>Qty</th><th>Unit £</th><th>Justification</th><th></th></tr></thead><tbody id="budgetBody">${rows}</tbody></table></div>
      <div class="link-list" style="margin-top:10px"><button class="btn secondary tiny" id="addBudgetRow">Add row</button><strong id="budgetTotal">Total: ${fmtMoney(budgetTotal())}</strong></div>
    </div>`;
  }
  function budgetTotal(){return state.budgetRows.reduce((s,r)=>s+(Number(r.qty)||0)*(Number(r.unit)||0),0)}
  function bindBudgetTool(){
    ["cat","item","qty","unit","just"].forEach(kind=>{
      appEl.querySelectorAll(`[data-budget-${kind}]`).forEach(el=>el.addEventListener("change",e=>{
        const i=Number(e.target.dataset["budget"+kind.charAt(0).toUpperCase()+kind.slice(1)]);
        const key={cat:"category",item:"item",qty:"qty",unit:"unit",just:"justification"}[kind];
        state.budgetRows[i][key]=["qty","unit"].includes(kind)?Number(e.target.value):e.target.value;saveState();
        document.getElementById("budgetTotal").textContent="Total: "+fmtMoney(budgetTotal());
      }));
    });
    appEl.querySelectorAll("[data-budget-del]").forEach(b=>b.addEventListener("click",()=>{state.budgetRows.splice(Number(b.dataset.budgetDel),1);saveState();renderMethods();}));
    document.getElementById("addBudgetRow").addEventListener("click",()=>{state.budgetRows.push({category:"Equipment",item:"",qty:1,unit:0,justification:""});saveState();renderMethods();});
  }

  function ethogramTool(){
    return `<div class="tool-card"><h3>Ethogram Builder</h3><p>Define observable behaviour before fieldwork or BORIS coding.</p>
      <div class="form-grid"><div class="field"><label>Behaviour</label><input id="ethName" placeholder="Grooming"></div><div class="field"><label>Type</label><select id="ethType"><option>State</option><option>Event</option></select></div><div class="field full"><label>Operational definition</label><textarea id="ethDef"></textarea></div></div>
      <button class="btn tiny" id="addEth" style="margin-top:10px">Add behaviour</button>
      <div id="ethList" class="tool-output">${state.ethogram.length?state.ethogram.map((e,i)=>`${i+1}. ${e.name} [${e.type}] — ${e.definition}`).join("\n"):"No behaviours defined yet."}</div></div>`;
  }
  function bindEthogramTool(){
    document.getElementById("addEth").addEventListener("click",()=>{const name=val("ethName").trim();if(!name)return;state.ethogram.push({name,type:val("ethType"),definition:val("ethDef")});saveState();renderMethods();});
  }

  function confoundTool(){
    const items=["Age","Sex","Dominance rank","Reproductive state","Season","Group membership","Group size","Food availability","Time of day","Habitat/visibility","Observer effort","Distance/detectability"];
    return `<div class="tool-card"><h3>Confound Checker</h3><p>Force an explicit decision: relevant, why, and how controlled?</p>
      <div class="list">${items.map(x=>{const c=state.confounds[x]||{};return `<div><label class="checkline"><input type="checkbox" data-conf-check="${x}" ${c.relevant?"checked":""}><strong>${x}</strong></label><input data-conf-note="${x}" style="margin-top:5px" placeholder="Why relevant / control strategy" value="${esc(c.note||"")}"></div>`}).join("")}</div></div>`;
  }
  function bindConfoundTool(){
    appEl.querySelectorAll("[data-conf-check]").forEach(e=>e.addEventListener("change",x=>{const k=x.target.dataset.confCheck;state.confounds[k]={...(state.confounds[k]||{}),relevant:x.target.checked};saveState();}));
    appEl.querySelectorAll("[data-conf-note]").forEach(e=>e.addEventListener("change",x=>{const k=x.target.dataset.confNote;state.confounds[k]={...(state.confounds[k]||{}),note:x.target.value};saveState();}));
  }

  function renderTaxa(){
    appEl.innerHTML=`
      <div class="card"><div class="eyebrow">Weekly handouts</div><h2>Primate Atlas</h2><p class="muted">The Moodle taxon sequence is separated from the assessment portfolio, but taxon work can seed literature searches and project ideas.</p></div>
      <div class="section-head"><div><h2>Course taxa</h2></div></div>
      <div class="grid three">${COURSE.taxa.map(t=>`<div class="atlas-card"><span class="pill">Week ${t.week}</span><h3 style="margin-top:10px">${esc(t.name)}</h3><p class="muted">${esc(t.hooks)}</p></div>`).join("")}</div>
      <div class="section-head"><div><h2>Research hooks beyond the weekly list</h2></div></div>
      <div class="grid three">
        ${[
          ["Marmosets","Cooperative breeding, vocal turn-taking, social learning and language evolution."],
          ["Geladas","Multilevel society, vocal complexity, conflict and reproductive counter-strategies."],
          ["Slow lorises","Venom evolution, nocturnal ecology and competing functional hypotheses."],
          ["Aye-ayes","Percussive foraging, sensory ecology and acoustic localisation."],
          ["Titi monkeys","Pair bonding, paternal care and parenting–bond trade-offs."],
          ["Owl monkeys","Pair living, paternal investment and genetic monogamy."],
          ["Bald uakaris","Facial colour as a possible social/health signal."],
          ["Bonobos","Female coalitions, affiliation and cooperation among non-kin."],
          ["Golden snub-nosed monkeys","Multilevel social organisation, cohesion and harsh-environment ecology."]
        ].map(x=>`<div class="atlas-card"><h3>${x[0]}</h3><p class="muted">${x[1]}</p></div>`).join("")}
      </div>
    `;
  }

  function renderFeedback(){
    appEl.innerHTML=`
      <div class="grid two">
        <div class="card">
          <h2>Feedback journal</h2>
          <div class="form-grid">
            <div class="field"><label>Source</label><select id="fbSource"><option>Tutor</option><option>Module leader</option><option>Peer</option><option>Seminar</option><option>Self</option><option>AI critique</option></select></div>
            <div class="field"><label>Week / date</label><input id="fbWhen"></div>
            <div class="field full"><label>Problem identified / feedback</label><textarea id="fbText"></textarea></div>
            <div class="field full"><label>My evaluation</label><textarea id="fbEval" placeholder="Do I agree? Why?"></textarea></div>
            <div class="field full"><label>Change made + why</label><textarea id="fbChange"></textarea></div>
          </div>
          <button class="btn" id="saveFeedback" style="margin-top:10px">Save reflection</button>
        </div>
        <div class="card">
          <h2>AI / authorship log</h2>
          <p class="muted">Keep the intellectual trail explicit: your initial thinking → external critique → your decision → your revision.</p>
          <div class="field"><label>My original thinking</label><textarea id="aiOriginal"></textarea></div>
          <div class="field"><label>External/AI critique</label><textarea id="aiCritique"></textarea></div>
          <div class="field"><label>My decision / revision</label><textarea id="aiDecision"></textarea></div>
          <button class="btn" id="saveAI" style="margin-top:10px">Save authorship entry</button>
        </div>
      </div>

      <div class="section-head"><div><h2>Feedback history</h2><p>Designed to feed directly into the Reflect feedback-journal page.</p></div></div>
      <div class="grid two">
        ${state.feedbackEntries.length?state.feedbackEntries.map(e=>`<div class="idea-card"><div class="eyebrow">${esc(e.source)} · ${esc(e.when)}</div><h4>${esc(e.text)}</h4><p class="muted"><strong>Evaluation:</strong> ${esc(e.evaluation)}</p><p><strong>Change:</strong> ${esc(e.change)}</p></div>`).join(""):'<div class="empty">No feedback reflections saved yet.</div>'}
      </div>

      <div class="section-head"><div><h2>Authorship trail</h2></div></div>
      <div class="grid two">
        ${state.authorshipEntries.length?state.authorshipEntries.map(e=>`<div class="idea-card"><h4>Original thinking</h4><p>${esc(e.original)}</p><p class="muted"><strong>Critique:</strong> ${esc(e.critique)}</p><p><strong>Decision:</strong> ${esc(e.decision)}</p></div>`).join(""):'<div class="empty">No authorship entries saved yet.</div>'}
      </div>
    `;
    document.getElementById("saveFeedback").addEventListener("click",()=>{
      const x={id:Date.now(),source:val("fbSource"),when:val("fbWhen"),text:val("fbText"),evaluation:val("fbEval"),change:val("fbChange")};
      if(!x.text.trim()){toast("Add the feedback first");return;} state.feedbackEntries.unshift(x);saveState();renderFeedback();
    });
    document.getElementById("saveAI").addEventListener("click",()=>{
      const x={id:Date.now(),original:val("aiOriginal"),critique:val("aiCritique"),decision:val("aiDecision")};
      if(!x.original.trim()){toast("Add your original thinking first");return;} state.authorshipEntries.unshift(x);saveState();renderFeedback();
    });
  }

  function openModal(html){
    const tpl=document.getElementById("modalTemplate");
    const node=tpl.content.cloneNode(true);node.querySelector(".modal-body").innerHTML=html;
    document.body.appendChild(node);
    const back=document.querySelector(".modal-backdrop:last-of-type");
    const close=()=>back.remove();
    back.querySelector(".modal-close").addEventListener("click",close);
    back.addEventListener("click",e=>{if(e.target===back)close()});
  }
  function val(id){return document.getElementById(id)?.value||""}

  document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
  document.getElementById("exportBtn").addEventListener("click",()=>{
    const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="anth0060-workspace-backup.json";a.click();URL.revokeObjectURL(a.href);
  });
  document.getElementById("importInput").addEventListener("change",e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();reader.onload=()=>{try{state={...defaultState,...JSON.parse(reader.result)};saveState();renderNav();render();toast("Workspace imported");}catch(err){toast("Invalid backup file")}};reader.readAsText(file);
  });

  renderNav();render();loadCalendar().then(()=>{if(state.route==="dashboard")renderDashboard();});
})();