import React, { useState } from "react";
import "./dashboard.css";

const initialComplaints = [
  { id: "RS1042", title: "Destination shop did not have one commodity", status: "Under review", owner: "District grievance cell", due: "24 Oct 2026", overdue: true, evidence: 2 },
  { id: "RS1018", title: "Record correction clarification", status: "Resolved", owner: "Local facilitator", due: "12 Oct 2026", overdue: false, evidence: 1 },
];

const members = [
  { name: "Priya Sharma", role: "Head", status: "Verified" },
  { name: "Rahul Kumar", role: "Member", status: "Name mismatch" },
  { name: "Anita Sharma", role: "Member", status: "Verified" },
  { name: "Rohan Sharma", role: "Member", status: "Verified" },
  { name: "Meera Sharma", role: "Member", status: "Verified" },
];

export default function Dashboard({ onLogout, onHome, lang = "EN", setLang }) {
  const hi = lang === "HI";
  const [active, setActive] = useState("overview");
  const [complaints, setComplaints] = useState(initialComplaints);
  const [profile, setProfile] = useState("Priya Sharma");
  const [showTranslator, setShowTranslator] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const navigate = (key) => setActive(key);

  return (
    <div className={`dash-shell ${largeText ? "large-text-mode" : ""}`}>
      <aside className="dash-sidebar">
        <button className="dash-brand dash-brand-button" onClick={onHome} aria-label="Go to RationSaathi homepage"><span>🛡️</span><b>Ration<span>Saathi</span></b></button>

        <div className="profile-switch">
          <small>{hi ? "सक्रिय प्रोफ़ाइल" : "ACTIVE PROFILE"}</small>
          <select value={profile} onChange={(e) => setProfile(e.target.value)}>
            {members.map(m => <option key={m.name}>{m.name}</option>)}
          </select>
          <p>{hi ? "साझा डिवाइस सुरक्षित" : "Shared-device safe"}</p>
        </div>

        <nav className="dash-nav">
          <Nav active={active} setActive={navigate} id="overview" icon="⌂" label={hi ? "डैशबोर्ड" : "Dashboard"} />
          <Nav active={active} setActive={navigate} id="household" icon="👨‍👩‍👧" label={hi ? "मेरा परिवार" : "My Household"} />
          <Nav active={active} setActive={navigate} id="portability" icon="📍" label={hi ? "पोर्टेबिलिटी" : "Portability"} />
          <Nav active={active} setActive={navigate} id="records" icon="🛡️" label={hi ? "रिकॉर्ड सुरक्षा" : "Record Safety"} />
          <Nav active={active} setActive={navigate} id="complaints" icon="📢" label={hi ? "शिकायतें" : "Complaints"} />
          <Nav active={active} setActive={navigate} id="drafts" icon="📄" label={hi ? "ऑफ़लाइन ड्राफ़्ट" : "Offline Drafts"} />
          <Nav active={active} setActive={navigate} id="privacy" icon="🔒" label={hi ? "गोपनीयता" : "Privacy"} />
          <Nav active={active} setActive={navigate} id="guide" icon="🧭" label={hi ? "उपयोग गाइड" : "Site Guide"} />
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => setShowVoice(true)}>🎙️ <span>{hi ? "साथी AI" : "Saathi AI"}</span></button>
          <button onClick={() => setLang(hi ? "EN" : "HI")}>अ↔A <span>{hi ? "Switch to English" : "हिंदी में देखें"}</span></button>
          <button onClick={() => setLargeText(v => !v)} aria-pressed={largeText}>Aa <span>{largeText ? "Disable large text" : "Enable large text"}</span></button>
          <button onClick={onLogout}>↪ <span>{hi ? "लॉग आउट" : "Logout"}</span></button>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div>
            <span className="dash-kicker">{hi ? "परिवार सेवा डैशबोर्ड" : "HOUSEHOLD SERVICE DASHBOARD"}</span>
            <h1>{active === "overview" ? (hi ? `नमस्ते, ${profile.split(" ")[0]} 👋` : `Good morning, ${profile.split(" ")[0]} 👋`) : pageTitle(active, hi)}</h1>
            <p>{active === "overview" ? (hi ? "आज आपका परिवार सुरक्षित रूप से क्या कर सकता है।" : "Here's what your household can safely do today.") : pageDescription(active, hi)}</p>
          </div>
          <div className="top-profile">
            <div className="avatar">PS</div>
            <div><b>{profile}</b><small>Demo account</small></div>
          </div>
        </div>

        {active === "overview" && <Overview navigate={navigate} complaints={complaints} />}
        {active === "household" && <Household />}
        {active === "portability" && <Portability />}
        {active === "records" && <RecordSafety />}
        {active === "complaints" && <Complaints complaints={complaints} setComplaints={setComplaints} />}
        {active === "drafts" && <Drafts />}
        {active === "privacy" && <Privacy largeText={largeText} setLargeText={setLargeText} />}
        {active === "guide" && <SiteGuide navigate={navigate} hi={hi} />}
      </main>

      {showTranslator && <Translator onClose={() => setShowTranslator(false)} />}
      {showVoice && <VoiceAssistant onClose={() => setShowVoice(false)} />}
    </div>
  );
}

function Nav({ active, setActive, id, icon, label }) {
  return <button className={active === id ? "active" : ""} onClick={() => setActive(id)}><span>{icon}</span>{label}</button>;
}

function pageTitle(id, hi = false) {
  if (hi) return { household: "मेरा परिवार", portability: "आज मैं क्या कर सकता हूँ?", records: "अपने रिकॉर्ड सुरक्षित रखें", complaints: "शिकायत ट्रैकर", drafts: "ऑफ़लाइन ड्राफ़्ट", privacy: "साझा डिवाइस गोपनीयता" }[id];
  return { household: "My Household", portability: "What can I do today?", records: "Protect Your Records", complaints: "Grievance Control Tower", drafts: "Offline Drafts", privacy: "Shared Device Privacy" }[id];
}
function pageDescription(id, hi = false) {
  if (hi) return { household: "चयनित परिवार सदस्य की जानकारी सुरक्षित रूप से देखें।", portability: "डेमो नियमों के आधार पर संभावित विकल्प देखें।", records: "सुधार करने से पहले उसके प्रभाव का परीक्षण करें।", complaints: "शिकायत का ज़िम्मेदार अधिकारी, समय-सीमा और आगे की कार्रवाई देखें।", drafts: "ड्राफ़्ट आधिकारिक रूप से जमा नहीं हुआ है।", privacy: "एक साझा डिवाइस पर प्रोफ़ाइल और जानकारी सुरक्षित रखें।" }[id];
  return {
    household: "Review member-level information without exposing it to other household profiles.",
    portability: "Explore a synthetic portability pathway with explicit stock uncertainty.",
    records: "Simulate corrections before they are attempted.",
    complaints: "Track ownership, response timelines and escalation.",
    drafts: "Saved assisted-service information is clearly marked as not submitted.",
    privacy: "See how a shared device can separate sessions and household profiles."
  }[id];
}

function Overview({ navigate, complaints }) {
  return <>
    <section className="status-card">
      <div><small>HOUSEHOLD STATUS</small><h2>Migrant household</h2><p>Home: Bihar <b>→</b> Current: Andhra Pradesh</p></div>
      <div className="status-stats"><Stat n="5" l="Members" /><Stat n="2 hrs" l="Last synced" /><Stat n="Active" l="Account" green /></div>
    </section>

    <section className="today-card-dash">
      <div><small>WHAT CAN YOU DO TODAY?</small><h2>Check your ration options</h2><p>Explore a synthetic portability pathway. Destination stock is explicitly shown as uncertain rather than guaranteed.</p><button onClick={() => navigate("portability")}>Check portability →</button></div>
      <div className="big-icon">📍</div>
    </section>

    <div className="dash-section-head"><div><small>NEEDS YOUR ATTENTION</small><h2>Things to review</h2></div></div>
    <div className="attention-grid">
      <Attention icon="⚠️" title="1 member needs verification" label="RECORD MISMATCH" text="Rahul Kumar's name differs between the household record and ID." action="Review safely →" onClick={() => navigate("records")} />
      <Attention icon="📢" title="Response overdue by 7 days" label="COMPLAINT OVERDUE" text={`Complaint #${complaints[0].id} is still under review.`} action="Open complaint →" onClick={() => navigate("complaints")} />
    </div>

    <div className="dash-section-head"><div><small>QUICK ACTIONS</small><h2>RationSaathi services</h2></div></div>
    <div className="quick-grid">
      <Quick icon="📍" title="Ration Portability" text="Check your options" onClick={() => navigate("portability")} />
      <Quick icon="🛡️" title="Record Safety" text="Simulate a correction" onClick={() => navigate("records")} />
      <Quick icon="📢" title="File Complaint" text="Report and track an issue" onClick={() => navigate("complaints")} />
      <Quick icon="📄" title="Offline Drafts" text="Review saved drafts" onClick={() => navigate("drafts")} />
    </div>

    <div className="data-legend"><b>Information status</b><span>🟢 Official record</span><span>🔵 Last synced</span><span>🟡 Household reported</span><span>⚠️ Availability uncertain</span></div>
  </>;
}

function Stat({ n, l, green }) { return <div><b className={green ? "green" : ""}>{n}</b><span>{l}</span></div>; }
function Attention({ icon, label, title, text, action, onClick }) {
  return <article className="attention"><div className="attention-icon">{icon}</div><div><small>{label}</small><h3>{title}</h3><p>{text}</p><button onClick={onClick}>{action}</button></div></article>;
}
function Quick({ icon, title, text, onClick }) { return <button className="quick-card" onClick={onClick}><div>{icon}</div><b>{title}</b><span>{text}</span></button>; }

function Household() {
  const [selected, setSelected] = useState(members[0].name);
  const m = members.find(x => x.name === selected);
  return <section className="content-panel">
    <div className="panel-head"><div><span className="dash-kicker">MEMBER-LEVEL RECORDS</span><h2>Household members</h2><p>Only the active profile should expose member details on a shared device.</p></div><span className="badge blue">Last synced 2 hrs ago</span></div>
    <div className="member-layout">
      <div className="member-list">
        {members.map(x => <button key={x.name} className={selected === x.name ? "selected" : ""} onClick={() => setSelected(x.name)}><span className="member-avatar">{x.name.split(" ").map(s=>s[0]).join("")}</span><span><b>{x.name}</b><small>{x.role}</small></span><em className={x.status === "Verified" ? "ok" : "warn"}>{x.status}</em></button>)}
      </div>
      <div className="member-detail">
        <span className="dash-kicker">ACTIVE PROFILE</span><h3>{m.name}</h3><p>{m.role}</p>
        <div className="detail-row"><span>Record status</span><b>{m.status}</b></div>
        <div className="detail-row"><span>Data source</span><b>Official record</b></div>
        <div className="detail-row"><span>Last synced</span><b>2 hours ago</b></div>
        <div className="privacy-note">🔒 Household membership is sensitive. Details are shown only within the selected profile.</div>
      </div>
    </div>
  </section>;
}

function Portability() {
  const [checked, setChecked] = useState(false);
  const [commodity, setCommodity] = useState("Rice");
  const [shop, setShop] = useState("nearby");
  const [eligibility, setEligibility] = useState(false);
  const [district, setDistrict] = useState("Vijayawada");
  const [stockFilter, setStockFilter] = useState("all");
  const stockRows = [
    { shop: "Demo Fair Price Shop 014", area: "Vijayawada Central", distance: "1.2 km", rice: "Reported available", wheat: "Uncertain", coarse: "Not reported", window: "10:00–13:00", updated: "2 hours ago", signal: "Household-reported demo" },
    { shop: "Demo Fair Price Shop 027", area: "Governorpet", distance: "2.8 km", rice: "Uncertain", wheat: "Reported available", coarse: "Uncertain", window: "14:00–17:00", updated: "Yesterday", signal: "Sample data" },
    { shop: "Demo Fair Price Shop 031", area: "Benz Circle", distance: "4.1 km", rice: "Reported unavailable", wheat: "Uncertain", coarse: "Not reported", window: "Confirm locally", updated: "3 days ago", signal: "Stale sample data" },
    { shop: "Demo Fair Price Shop 042", area: "Auto Nagar", distance: "5.6 km", rice: "Uncertain", wheat: "Reported unavailable", coarse: "Reported available", window: "11:00–16:00", updated: "6 hours ago", signal: "Sample data" },
  ];
  const selectedKey = commodity === "Rice" ? "rice" : commodity === "Wheat" ? "wheat" : "coarse";
  const visibleRows = stockFilter === "all" ? stockRows : stockRows.filter(r => r[selectedKey].toLowerCase().includes(stockFilter));
  const selectedStatus = { Rice: "Stock reports vary by shop", Wheat: "Stock is uncertain at several locations", "Coarse grains": "Limited sample reports available" }[commodity];
  return <section className="content-panel">
    <div className="panel-head"><div><span className="dash-kicker">PORTABILITY PATHWAY</span><h2>What can I do today?</h2><p>Explore sample shops, compare reported commodity status and prepare before travelling.</p></div><span className="badge amber">Demo data · not live</span></div>
    <div className="india-location-card"><div className="india-map-wrap"><svg className="india-map" viewBox="0 0 220 250" role="img" aria-label="Stylized map of India with a location pin"><path d="M73 12 L98 18 L113 33 L130 35 L145 49 L160 54 L168 70 L184 77 L178 93 L190 106 L177 121 L168 136 L155 146 L149 165 L137 178 L132 198 L119 224 L108 208 L101 185 L88 171 L79 151 L65 139 L58 119 L43 107 L39 91 L51 79 L45 64 L56 48 L60 31 Z" fill="#e8f1ff" stroke="#8db4ef" strokeWidth="2" strokeLinejoin="round"/><path d="M61 51 L91 63 L111 53 L139 67 M46 91 L81 101 L113 92 L161 106 M65 132 L96 126 L134 143 M89 169 L119 162" fill="none" stroke="#c1d7f7" strokeWidth="1.5"/><path d="M130 108 C130 98 138 91 147 91 C156 91 164 98 164 108 C164 121 147 139 147 139 C147 139 130 121 130 108Z" fill="#2563eb" stroke="#fff" strokeWidth="3"/><circle cx="147" cy="107" r="5" fill="white"/></svg></div><div className="india-location-copy"><span className="dash-kicker">YOUR REPORTED LOCATION</span><h3>Andhra Pradesh, India</h3><p><span className="map-pin-dot"></span> Household-reported demo location</p><small>Approximate visual indicator only — not GPS tracking.</small><label className="compact-label">Demo area<select value={district} onChange={e=>setDistrict(e.target.value)}><option>Vijayawada</option><option>Guntur</option><option>Amaravati</option><option>Visakhapatnam</option></select></label></div></div>
    <div className="route-box"><div className="route-place"><small>HOME</small><b>Bihar</b><span>Household record · demo</span></div><div className="route-line">→</div><div className="route-place current"><small>CURRENT LOCATION</small><b>{district}, Andhra Pradesh</b><span>Household reported · demo</span></div></div>
    <div className="stock-summary-grid"><article><span>COMMODITY SELECTED</span><b>{commodity}</b><small>Sample pathway</small></article><article><span>REPORT SUMMARY</span><b>{selectedStatus}</b><small>Availability can change</small></article><article><span>SHOPS IN SAMPLE</span><b>{stockRows.length}</b><small>Illustrative entries</small></article></div>
    <div className="stock-checker"><div><span className="dash-kicker">STOCK & ELIGIBILITY EXPLORER</span><h3>Compare before you travel</h3><p>Use the table as a demonstration of how uncertain, stale and reported data could be displayed.</p></div>
      <div className="form-grid"><label>Commodity<select value={commodity} onChange={e=>{setCommodity(e.target.value);setChecked(false)}}><option>Rice</option><option>Wheat</option><option>Coarse grains</option></select></label><label>Shop option<select value={shop} onChange={e=>{setShop(e.target.value);setChecked(false)}}><option value="nearby">Nearby destination shop</option><option value="alternate">Alternative shop (verify first)</option><option value="home">Home-state shop</option></select></label></div>
      <div className="stock-filters"><b>Filter sample results</b><div><button className={stockFilter==="all"?"filter-active":""} onClick={()=>setStockFilter("all")}>All reports</button><button className={stockFilter==="available"?"filter-active":""} onClick={()=>setStockFilter("available")}>Reported available</button><button className={stockFilter==="uncertain"?"filter-active":""} onClick={()=>setStockFilter("uncertain")}>Uncertain</button><button className={stockFilter==="unavailable"?"filter-active":""} onClick={()=>setStockFilter("unavailable")}>Reported unavailable</button></div></div>
      <div className="stock-table-wrap"><table className="stock-table"><thead><tr><th>Demo shop / area</th><th>{commodity} report</th><th>Distance</th><th>Service window</th><th>Data freshness</th></tr></thead><tbody>{visibleRows.map(r=><tr key={r.shop}><td><b>{r.shop}</b><small>{r.area}</small></td><td><span className={`stock-pill ${r[selectedKey].toLowerCase().includes("available") && !r[selectedKey].toLowerCase().includes("unavailable") ? "stock-ok" : r[selectedKey].toLowerCase().includes("unavailable") ? "stock-no" : "stock-unknown"}`}>{r[selectedKey]}</span></td><td>{r.distance}</td><td>{r.window}</td><td><b>{r.updated}</b><small>{r.signal}</small></td></tr>)}</tbody></table></div>
      <button className="primary-action" onClick={()=>{setChecked(true);setEligibility(true)}}>Check my demo pathway →</button>
      {checked && <div className="stock-result"><div className="stock-result-icon">📍</div><div><b>{commodity} · {shop === "home" ? "Home-state option" : shop === "alternate" ? "Alternative shop pathway" : "Destination shop pathway"}</b><p>{shop === "home" ? "Ask the relevant home-state authority how your case is handled before travelling." : shop === "alternate" ? "Compare the sample entries, then contact an authorised shop or facilitator to verify stock and portability rules." : "The table contains mixed reports. Contact the shop or local facilitator to confirm current stock, service hours and eligibility."}</p><span className="badge amber">Illustrative only · no live stock or entitlement confirmation</span></div></div>}
    </div>
    <div className="option-grid"><div className="option-card"><b>1. Verify destination option</b><p>Ask whether the shop can serve the portable entitlement today.</p><span>⚠️ Availability not guaranteed</span></div><div className="option-card"><b>2. Compare another shop</b><p>Use the sample list to understand what a comparison workflow could look like.</p><span>ℹ️ Confirm locally</span></div><div className="option-card"><b>3. Prepare an assisted draft</b><p>Record your question offline if connectivity is weak.</p><span>📄 Draft only</span></div></div>
    <button className="ghost-action" onClick={() => setEligibility(!eligibility)}>{eligibility ? "Hide eligibility checklist" : "View eligibility checklist"}</button>
    {eligibility && <div className="checklist-box"><h3>Before you go</h3><ul><li>Check the accepted documents with the authorised service point.</li><li>Confirm portability eligibility for your specific household case.</li><li>Verify the selected commodity's current stock and service window.</li><li>If refused, note the date, shop and stated reason; file a grievance if needed.</li></ul><p><b>Important:</b> This checklist is general guidance, not a guarantee of entitlement.</p></div>}
  </section>;
}

function RecordSafety() {
  const [simulated, setSimulated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [proposedName, setProposedName] = useState("Rahul Kumar Singh");
  const [proposedAge, setProposedAge] = useState("27");
  const [notice, setNotice] = useState("");
  const [audit, setAudit] = useState(["Demo opened · no official record changed"]);
  const [showSensitive, setShowSensitive] = useState(false);
  const [archiveRequested, setArchiveRequested] = useState(false);
  const simulate = () => { setSimulated(true); setNotice("Simulation only: proposed changes are not sent anywhere."); setAudit(a=>["Correction simulation run · no official record changed", ...a]); };
  return <section className="content-panel">
    <div className="panel-head"><div><span className="dash-kicker">RATIONSHIELD · RECORD SAFETY</span><h2>Review, change or protect a record</h2><p>Every action below is a local demo. Official records cannot be changed or deleted from this prototype.</p></div><span className="badge green">Safety checks on</span></div>
    <div className="warning-banner">🛡️ <div><b>Potential entitlement risk detected</b><p>A careless correction could remove a household member from the record. We recommend verification instead of deletion.</p></div></div>
    <div className="compare-grid"><div><small>OFFICIAL / LAST-SYNCED RECORD</small><h3>Rahul Kumar Singh</h3><p>Age: 27</p><span className="badge blue">Official record · demo</span></div><div><small>HOUSEHOLD-REPORTED ID</small><h3>Rahul Kumar</h3><p>Age: 27</p><span className="badge yellow">Household reported</span></div></div>
    <div className="mismatch-list"><div><b>Mismatch type</b><span>Name variation</span></div><div><b>Possible responsible authority</b><span>Record-maintaining authority (verify locally)</span></div><div><b>Evidence to prepare</b><span>Accepted ID / household documents, as required locally</span></div></div>
    <div className="record-actions"><button className="primary-action" onClick={()=>setEditing(!editing)}>{editing ? "Close edit proposal" : "✎ Propose record change"}</button><button className="ghost-action" onClick={simulate}>Run safety simulation</button><button className="ghost-action" onClick={()=>{setShowSensitive(!showSensitive);setNotice(showSensitive ? "Sensitive details hidden." : "Sensitive details are visible only in this demo screen.")}}>{showSensitive ? "Hide sensitive details" : "View sensitive details"}</button><button className="danger-outline" onClick={()=>{setArchiveRequested(true);setNotice("Deletion blocked in this prototype. Use the authorised record-maintaining process; never delete a member to resolve a mismatch.");setAudit(a=>["Unsafe deletion attempt blocked",...a])}}>Request deletion / removal</button></div>
    {editing && <div className="edit-proposal"><h3>Proposed change · not submitted</h3><div className="form-grid"><label>Proposed name<input value={proposedName} onChange={e=>setProposedName(e.target.value)} /></label><label>Proposed age<input value={proposedAge} onChange={e=>setProposedAge(e.target.value)} inputMode="numeric" /></label></div><p className="privacy-note">These fields are a draft proposal only. Do not use a name correction to remove or replace a household member.</p><button className="primary-action" onClick={simulate}>Check impact before saving →</button></div>}
    {simulated && <div className="blocked-note">🛑 Safety result: no official record was changed. Confirm identity and evidence with the authorised authority. Any proposal that removes a member is flagged for manual verification.</div>}
    {showSensitive && <div className="checklist-box"><h3>Protected record details</h3><p>Demo household ID: <b>DEMO-RS-2048</b></p><p>Member reference: <b>MEM-02 (synthetic)</b></p><p>Do not display household IDs on shared-device notifications or public complaint pages.</p></div>}
    {notice && <div className="success-note">{notice}</div>}
    {archiveRequested && <div className="blocked-note">Deletion request not sent. This demo intentionally blocks destructive record actions.</div>}
    <div className="audit-box"><h3>Safety activity log</h3>{audit.map((a,i)=><p key={i}>• {a}</p>)}</div>
  </section>;
}

function Complaints({ complaints, setComplaints }) {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(complaints[0]);
  const [satisfaction, setSatisfaction] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [protectedReport, setProtectedReport] = useState(false);
  const [notice, setNotice] = useState("");

  const submitComplaint = (e) => {
    e.preventDefault();
    const newC = { id: "RS1056", title: "New household service complaint", status: "Submitted", owner: "To be assigned", due: "31 Oct 2026", overdue: false, evidence: evidence.length };
    setComplaints([newC, ...complaints]);
    setSelected(newC);
    setShowForm(false);
  };

  if (showForm) return <ComplaintForm onCancel={() => setShowForm(false)} onSubmit={submitComplaint} evidence={evidence} setEvidence={setEvidence} protectedReport={protectedReport} setProtectedReport={setProtectedReport} />;

  return <section className="content-panel">
    <div className="panel-head"><div><span className="dash-kicker">GRIEVANCE CONTROL TOWER</span><h2>Track complaints</h2><p>Clear ownership, response clocks, evidence and escalation.</p></div><button className="primary-action compact" onClick={() => setShowForm(true)}>+ File complaint</button></div>
    <div className="complaint-layout">
      <div className="complaint-list">
        {complaints.map(c => <button key={c.id} className={selected.id === c.id ? "selected" : ""} onClick={() => {setSelected(c); setSatisfaction(null)}}><div><b>#{c.id}</b><small>{c.status}</small></div><span>{c.overdue ? "Overdue" : c.due}</span></button>)}
      </div>
      <div className="complaint-detail">
        <div className="complaint-id"><span>COMPLAINT</span><b>#{selected.id}</b>{selected.overdue && <em>Response overdue</em>}</div>
        <h3>{selected.title}</h3>
        <div className="timeline">
          <Timeline done label="Complaint submitted" />
          <Timeline done={selected.status !== "Submitted"} label="Assigned to authority" />
          <Timeline done={selected.status === "Under review" || selected.status === "Resolved"} active={selected.status === "Under review"} label={selected.status === "Resolved" ? "Resolved" : "Under review"} />
          <Timeline label="Response received" />
        </div>
        <div className="detail-row"><span>Owner</span><b>{selected.owner}</b></div>
        <div className="detail-row"><span>Expected response</span><b>{selected.due}</b></div>
        <div className="detail-row"><span>Evidence</span><b>{selected.evidence} attachment(s)</b></div>
        <div className="evidence-mini"><b>Evidence</b><span>📷 Photo evidence</span><span>🎙️ Voice note</span><span>📄 Document</span></div>
        {notice && <div className="success-note">{notice}</div>}
        {selected.status === "Resolved" ? <div className="rating-box"><b>Was your issue resolved?</b><div>{["Yes", "Partially", "No"].map(x => <button key={x} className={satisfaction === x ? "picked" : ""} onClick={() => setSatisfaction(x)}>{x}</button>)}</div>{satisfaction === "No" && <button className="escalate-btn" onClick={() => { const updated={...selected, status:"Under review", overdue:false}; setComplaints(complaints.map(c => c.id === selected.id ? updated : c)); setSelected(updated); setNotice("Complaint reopened in this demo and marked for follow-up."); }}>Reopen / Escalate</button>}</div> : <button className="escalate-btn" onClick={() => { if (selected.overdue) { const updated={...selected, status:"Escalated", owner:"District grievance escalation cell", overdue:false}; setComplaints(complaints.map(c => c.id === selected.id ? updated : c)); setSelected(updated); setNotice("Escalation recorded in the demo. Owner updated to the district escalation cell."); } else setNotice("Notification preference saved for this demo complaint."); }}>{selected.overdue ? "Escalate complaint →" : "Notify me when answered"}</button>}
      </div>
    </div>
  </section>;
}

function Timeline({ done, active, label }) { return <div className={`${done ? "done " : ""}${active ? "active " : ""}timeline-item`}><span>{done ? "✓" : active ? "●" : "○"}</span>{label}</div>; }

function ComplaintForm({ onCancel, onSubmit, evidence, setEvidence, protectedReport, setProtectedReport }) {
  return <section className="content-panel">
    <div className="panel-head"><div><span className="dash-kicker">NEW GRIEVANCE</span><h2>File a complaint</h2><p>Review everything before submitting. Evidence is optional.</p></div></div>
    <form className="complaint-form" onSubmit={onSubmit}>
      <label>What happened?<textarea required placeholder="Describe the issue in your own words..." /></label>
      <label>Where did it happen?<input placeholder="Destination ration shop / facilitator centre" /></label>
      <div className="form-grid"><label>Commodity<input placeholder="Example: wheat" /></label><label>Date<input type="date" /></label></div>
      <label>Evidence <input type="file" multiple onChange={(e) => setEvidence(Array.from(e.target.files || []))} /><small>Photos, video, documents or voice recordings can be attached in a real implementation.</small></label>
      <div className="evidence-preview">{evidence.map(f => <span key={f.name}>📎 {f.name}</span>)}</div>
      <label className="check-row"><input type="checkbox" checked={protectedReport} onChange={(e) => setProtectedReport(e.target.checked)} /><span><b>Protected reporting</b><small>Keep reporter identity out of the public aggregate view. This prototype does not publish household identity.</small></span></label>
      <div className="draft-submit-note">ℹ️ Submitting this form is a demo action. An actual deployment would connect only to an authorized grievance system.</div>
      <div className="form-actions"><button type="button" className="ghost-action" onClick={onCancel}>Cancel</button><button className="primary-action">Review & Submit →</button></div>
    </form>
  </section>;
}

function Drafts() {
  const [drafts, setDrafts] = useState([{id:"RS-D7K2", title:"Facilitator centre form", detail:"Household record clarification", progress:70, saved:"35 min ago", status:"DRAFT — NOT SUBMITTED"},{id:"RS-P3L8", title:"Complaint preparation", detail:"Destination commodity unavailable", progress:35, saved:"Yesterday", status:"DRAFT — NOT SUBMITTED"}]);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const removeDraft = id => { setDrafts(ds=>ds.filter(d=>d.id!==id)); setSelected(null); setNotice("Draft deleted from this local demo only."); };
  return <section className="content-panel"><div className="panel-head"><div><span className="dash-kicker">ASSISTED / OFFLINE WORKFLOW</span><h2>Saved drafts</h2><p>Open, edit or delete saved preparation. A draft is never an official submission.</p></div><span className="badge amber">Not submitted</span></div>
    {drafts.length===0 && <div className="empty-state"><h3>No saved drafts</h3><p>Your local demo draft list is empty.</p></div>}
    <div className="draft-list">{drafts.map(d=><article className="draft-card" key={d.id}><div className="draft-top"><span className="draft-badge">{d.status}</span><span>Saved {d.saved}</span></div><h3>{d.title}</h3><p>{d.detail} · {d.progress}% complete</p><div className="draft-progress"><span style={{width:`${d.progress}%`}} /></div><div className="draft-meta"><span>{d.progress}% complete</span><span>Short-code receipt: {d.id}</span></div><div className="record-actions"><button className="primary-action" onClick={()=>{setSelected(d);setEditTitle(d.title);setNotice("")}}>View draft</button><button className="ghost-action" onClick={()=>{setSelected(d);setEditTitle(d.title);setNotice("")}}>Edit draft</button><button className="danger-outline" onClick={()=>removeDraft(d.id)}>Delete draft</button></div></article>)}</div>
    {selected && <div className="edit-proposal"><div className="panel-head"><div><span className="dash-kicker">DRAFT DETAIL</span><h3>{selected.id}</h3></div><button className="ghost-action" onClick={()=>setSelected(null)}>Close</button></div><label>Draft title<input value={editTitle} onChange={e=>setEditTitle(e.target.value)} /></label><p><b>Current status:</b> DRAFT — NOT SUBMITTED</p><p><b>Details:</b> {selected.detail}</p><p><b>Completion:</b> {selected.progress}%</p><div className="record-actions"><button className="primary-action" onClick={()=>{setDrafts(ds=>ds.map(d=>d.id===selected.id?{...d,title:editTitle}:d));setSelected({...selected,title:editTitle});setNotice("Draft changes saved locally. Nothing has been submitted.")}}>Save draft changes</button><button className="ghost-action" onClick={()=>setNotice("Draft validation complete. Missing details can be completed later; this is not submitted.")}>Check completeness</button></div></div>}
    {notice && <div className="success-note">{notice}</div>}<div className="draft-submit-note">ℹ️ Short codes are demo receipts, not official acknowledgement numbers. Drafts are stored only in this prototype's current UI state.</div>
  </section>;
}

function Privacy({ largeText, setLargeText }) {
  const [ended, setEnded] = useState(false);
  const [settings, setSettings] = useState({ profileLock: true, maskNotifications: true, clearOnExit: true, voiceReadback: false, largeText: false });
  const toggle = key => {
    if (key === "largeText") setLargeText(value => !value);
    setSettings(old => ({ ...old, [key]: key === "largeText" ? !largeText : !old[key] }));
  };
  const rows = [
    ["profileLock", "Profile separation", "Keep each household profile separate when switching members."],
    ["maskNotifications", "Mask private notifications", "Avoid exposing names or complaint details on shared-device notifications."],
    ["clearOnExit", "Clear session on exit", "Clear the visible demo session when ending the session."],
    ["voiceReadback", "Read-back assistance", "Show a reminder to read critical details aloud before proceeding."],
    ["largeText", "Large text mode", "Increase text size for easier reading across the dashboard."],
  ];
  return <section className="content-panel">
    <div className="panel-head"><div><span className="dash-kicker">ONE PHONE, FIVE PEOPLE</span><h2>Privacy & accessibility controls</h2><p>Enable or disable demo preferences. A production service would enforce these controls at the account and device level.</p></div><span className="badge green">Local demo settings</span></div>
    <div className="privacy-settings-list">{rows.map(([key,title,desc])=><div className="privacy-setting" key={key}><div><b>{title}</b><p>{desc}</p><small>{settings[key] ? "Enabled" : "Disabled"}</small></div><button className={`toggle-switch ${settings[key] ? "on" : ""}`} role="switch" aria-checked={settings[key]} onClick={()=>toggle(key)}><span /></button></div>)}</div>
    {settings.largeText && <div className="success-note">Large text preference is enabled in this settings panel. Use the Aa control in the sidebar to apply larger text across the dashboard.</div>}
    <div className="privacy-grid"><div><b>Profile switching</b><p>Only the active profile should be visible during a session.</p><span>{settings.profileLock ? "✓ Enabled" : "○ Disabled in demo"}</span></div><div><b>History leakage</b><p>Private service actions should not appear in shared household history.</p><span>{settings.maskNotifications ? "✓ Masked" : "⚠ Masking disabled"}</span></div><div><b>Session cleanup</b><p>End the demo session to clear locally displayed household data.</p><button className="secondary-action" onClick={() => setEnded(true)}>{ended ? "✓ Session ended" : "End demo session"}</button></div></div>
    {ended && <div className="success-note">Demo session ended. This display is a demonstration; no government account or official data is connected.</div>}
    <div className="draft-submit-note">Privacy note: these switches demonstrate UI behaviour only. Do not enter real ration-card numbers, identity documents or sensitive household information into this prototype.</div>
  </section>;
}

function SiteGuide({ navigate, hi }) {
  const steps = [
    { n: "01", icon: "📍", title: "Check stock & portability", text: "Choose a commodity, compare sample shop reports, and read the uncertainty labels before deciding what to verify locally.", action: "Open portability", target: "portability" },
    { n: "02", icon: "🛡️", title: "Review a mismatch safely", text: "Compare the sample record with household-reported information. Propose a correction and run the safety simulation before taking any real-world action.", action: "Open record safety", target: "records" },
    { n: "03", icon: "📄", title: "Save work as a draft", text: "Open or edit saved preparation. Every offline draft remains clearly marked DRAFT — NOT SUBMITTED.", action: "View drafts", target: "drafts" },
    { n: "04", icon: "📢", title: "File and follow a grievance", text: "Create a demo complaint, attach evidence, track ownership and explore the escalation workflow.", action: "Open complaints", target: "complaints" },
    { n: "05", icon: "🔒", title: "Set privacy preferences", text: "Enable or disable profile separation, notification masking, session cleanup and accessibility preferences in the demo.", action: "Privacy settings", target: "privacy" },
  ];
  return <section className="content-panel guide-panel"><div className="panel-head"><div><span className="dash-kicker">START HERE</span><h2>{hi ? "RationSaathi उपयोग गाइड" : "Your guide to RationSaathi"}</h2><p>{hi ? "हर सुविधा को सुरक्षित तरीके से इस्तेमाल करने के लिए चरण-दर-चरण निर्देश।" : "A quick, practical walkthrough of the main prototype features."}</p></div><span className="badge blue">5-step guide</span></div>
    <div className="guide-notice"><b>Before you begin</b><p>This is a hackathon prototype with synthetic data. It cannot check real entitlement, live shop stock or submit official records or complaints.</p></div>
    <div className="guide-steps">{steps.map(step=><article className="guide-step" key={step.n}><div className="guide-number">{step.n}</div><div className="guide-step-icon">{step.icon}</div><div className="guide-step-copy"><h3>{step.title}</h3><p>{step.text}</p><button className="secondary-action" onClick={()=>navigate(step.target)}>{step.action} →</button></div></article>)}</div>
    <div className="guide-faq"><h3>What do the data labels mean?</h3><div><b>Official / last-synced</b><p>Would identify information sourced from an authorised record and when it was last updated. In this prototype, all examples are synthetic.</p></div><div><b>Household-reported</b><p>Information entered or stated by the household; it may need verification.</p></div><div><b>Uncertain / stale</b><p>Do not rely on it as current. Confirm stock, timing and eligibility directly with an authorised service point.</p></div></div>
  </section>;
}

function Translator({ onClose }) {
  return <Modal title="Hindi ↔ English" icon="अ↔A" onClose={onClose}><div className="translation-box"><span>Hindi</span><p>आपकी शिकायत समीक्षा में है।</p></div><div className="translation-box"><span>English</span><p>Your complaint is under review.</p></div><div className="modal-note">Demo translation. Future versions can add regional languages, speech input and read-back.</div></Modal>;
}

function VoiceAssistant({ onClose }) {
  const [listening, setListening] = useState(false);
  return <Modal title="Saathi AI" icon="🎙️" onClose={onClose}><div className={`voice-orb ${listening ? "listening" : ""}`}>🎙️</div><h3 className="voice-prompt">{listening ? "Listening…" : "What do you need help with?"}</h3><p className="modal-muted">Try: “Can I collect ration after moving?” or “Why is this record different?”</p><button className="primary-action full" onClick={() => setListening(!listening)}>{listening ? "Stop listening" : "Start voice assistant"}</button><div className="modal-note">AI capabilities are represented as a prototype layer; no real government system is connected.</div></Modal>;
}

function Modal({ title, icon, onClose, children }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><div className="modal-icon">{icon}</div><h2>{title}</h2>{children}</div></div>;
}
