import React from "react";
import "./body.css";

export default function Body({ onLogin, lang = "EN" }) {
  const hi = lang === "HI";
  const features = [
    ["📍", "Check Ration Portability", "Understand possible options when a household moves to another location."],
    ["🛡️", "Protect Your Records", "Simulate a correction before submission and catch changes that could harm entitlement."],
    ["📢", "Track Complaints", "Follow ownership, response timelines, evidence and escalation in one place."],
    ["📄", "Offline Drafts", "Prepare an assisted-service form with an unmistakable draft—not submitted status."],
    ["🔒", "Shared Device Privacy", "Switch between household profiles without exposing sensitive information."],
    ["🎙️", "Voice Assistance", "Use simple language, read-back and voice-friendly interactions for accessibility."],
  ];

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">{hi ? "सार्वजनिक सेवा मार्गदर्शक" : "PUBLIC SERVICE NAVIGATOR"}</div>
          <h1>{hi ? <>आपका राशन।<br /><span>आपके अधिकार। अगला कदम।</span></> : <>Your ration.<br /><span>Your rights. Your next step.</span></>}</h1>
          <p>
            RationSaathi helps migrant households understand what they can safely do today,
            protect household records, prepare offline drafts and track unresolved grievances.
          </p>
          <div className="hero-actions">
            <button className="primary-cta" onClick={onLogin}>{hi ? "डेमो खाता खोलें →" : "Explore Demo Account →"}</button>
            <a className="secondary-cta" href="#features">{hi ? "यह कैसे काम करता है" : "See how it works"}</a>
          </div>
          <div className="trust-row">
            <span>✓ {hi ? "काल्पनिक डेमो डेटा" : "Synthetic demo data"}</span>
            <span>✓ {hi ? "लाभ की गारंटी नहीं" : "No entitlement guarantees"}</span>
            <span>✓ {hi ? "गोपनीयता पहले" : "Privacy-first design"}</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-top">
            <span>{hi ? "परिवार की स्थिति" : "HOUSEHOLD STATUS"}</span>
            <b>● Demo</b>
          </div>
          <div className="hero-family">
            <div className="family-icon">👨‍👩‍👧‍👦</div>
            <div>
              <strong>{hi ? "प्रवासी परिवार" : "Migrant household"}</strong>
              <p>Bihar → Andhra Pradesh</p>
            </div>
          </div>
          <div className="hero-alert">
            <span>⚠️</span>
            <div><b>1 record needs review</b><small>Name differs between household record and ID.</small></div>
          </div>
          <div className="hero-next">
            <small>WHAT CAN I DO TODAY?</small>
            <strong>Check portability options →</strong>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-intro">
          <span className="section-label">{hi ? "RATIONSAATHI क्यों" : "WHY RATIONSAATHI"}</span>
          <h2>{hi ? "कागज़ी प्रक्रिया नहीं, लोगों की ज़रूरतों के लिए सरकारी सेवाएँ।" : "Government services designed around people, not paperwork."}</h2>
          <p>
            The prototype focuses on the hard parts of ration access: migration, weak connectivity,
            mismatched records, shared devices and complaints that do not get a timely response.
          </p>
        </div>

        <div className="problem-strip">
          <div><b>01</b><span>Portability uncertainty</span></div>
          <div><b>02</b><span>Record mismatch risk</span></div>
          <div><b>03</b><span>Complaint follow-up</span></div>
          <div><b>04</b><span>Low-bandwidth access</span></div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-intro center">
          <span className="section-label">{hi ? "मुख्य सुविधाएँ" : "KEY FEATURES"}</span>
          <h2>{hi ? "आपके परिवार की ज़रूरतें, एक ही जगह।" : "Everything your household needs, in one place."}</h2>
          <p>{hi ? "हर सुविधा प्रवासी परिवारों की वास्तविक समस्या को हल करने के लिए बनाई गई है।" : "Each feature is designed around a real failure point in the migration scenario."}</p>
        </div>

        <div className="feature-grid">
          {features.map(([icon, title, text]) => (
            <article className="feature-card feature-card-action" key={title} role="button" tabIndex={0} onClick={onLogin} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onLogin(); }}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="feature-arrow">Explore →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="translator-section">
        <div>
          <span className="section-label">{hi ? "सुलभता" : "ACCESSIBILITY"}</span>
          <h2>{hi ? "सरकारी जानकारी अपनी भाषा में समझें।" : "Understand public-service language in a language you use."}</h2>
          <p>{hi ? "हिंदी ↔ अंग्रेज़ी भाषा बदलने की सुविधा नेविगेशन में उपलब्ध है। आगे चलकर क्षेत्रीय भाषाएँ और आवाज़ में जानकारी सुनने की सुविधा जोड़ी जा सकती है।" : "Hindi ↔ English translation is built into the navigation. Future versions can extend this to regional languages and voice read-back."}</p>
        </div>
        <div className="translator-demo">
          <div className="translate-head"><span>अ</span><b>Hindi ↔ English</b><span>A</span></div>
          <div className="translate-row">
            <span>Hindi</span>
            <p>आपकी शिकायत समीक्षा में है।</p>
          </div>
          <div className="translate-row">
            <span>English</span>
            <p>Your complaint is under review.</p>
          </div>
          <button onClick={onLogin}>Try in Demo →</button>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-intro center"><span className="section-label">FAQ</span><h2>Questions, answered clearly.</h2><p>Know what this prototype can—and cannot—do.</p></div>
        <div className="faq-list">
          <details><summary>Can RationSaathi guarantee ration availability?</summary><p>No. Stock can change at any time. The demo shows illustrative stock signals and encourages you to confirm with the destination shop or an authorised facilitator before travelling.</p></details>
          <details><summary>Does checking eligibility change my ration card?</summary><p>No. The eligibility and portability checker uses synthetic demo rules. It does not access or modify official government records.</p></details>
          <details><summary>Is a saved draft an official complaint?</summary><p>No. A draft is clearly marked “DRAFT — NOT SUBMITTED”. An official submission would require a verified, authorised service channel and a real acknowledgement.</p></details>
          <details><summary>Can I correct or delete a household member here?</summary><p>You can test a proposed correction in the demo. Destructive changes are blocked because an incorrect correction could affect entitlement. Contact the authorised record-maintaining authority for actual changes.</p></details>
          <details><summary>How does shared-device privacy work?</summary><p>The prototype demonstrates profile switching and session cleanup. Avoid leaving sensitive information visible on a shared device. Production-grade storage and authentication would be needed for real household data.</p></details>
          <details><summary>Are the complaints sent to a government department?</summary><p>No. Complaint creation, status changes, escalation and evidence previews are demo interactions only. No real complaint is sent.</p></details>
        </div>
      </section>

      <section className="contact-cta" id="contact">
        <div>
          <span className="section-label">{hi ? "मदद चाहिए?" : "NEED HELP?"}</span>
          <h2>{hi ? <>हम प्रक्रिया को<br />आसान बनाने के लिए हैं।</> : <>We're here to make<br />the process simpler.</>}</h2>
        </div>
        <button onClick={onLogin}>Open Demo →</button>
      </section>
    </main>
  );
}
