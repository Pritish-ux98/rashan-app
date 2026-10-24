import React from "react";
import "./login.css";

export default function Login({ onBack, onLogin, lang = "EN" }) {
  const hi = lang === "HI";
  return (
    <main className="login-page">
      <button className="back-home" onClick={onBack}>{hi ? "← होम पर वापस" : "← Back to Home"}</button>

      <section className="login-card">
        <div className="login-logo">🛡️</div>
        <div className="section-label">DEMO ACCESS</div>
        <h1>{hi ? "RationSaathi में आपका स्वागत है" : "Welcome to RationSaathi"}</h1>
        <p className="login-subtitle">{hi ? "काल्पनिक डेमो डेटा के साथ परिवार की सेवाओं को देखें।" : "Explore the complete household service journey using synthetic demo data."}</p>

        <div className="demo-banner">
          <span>✨</span>
          <div>
            <strong>{hi ? "हैकाथॉन डेमो खाता" : "Hackathon Demo Account"}</strong>
            <p>No real government account is connected. This prototype uses fictional household data.</p>
          </div>
        </div>

        <label>Mobile Number</label>
        <input value="98765 43210" readOnly />

        <label>Demo PIN</label>
        <input type="password" value="1234" readOnly />

        <button className="demo-login-btn" onClick={onLogin}>{hi ? "डेमो खाते में लॉग इन →" : "Login to Demo Account →"}</button>

        <div className="demo-info">
          <b>Priya Sharma</b>
          <span>5-member migrant household · Bihar → Andhra Pradesh</span>
        </div>
      </section>
    </main>
  );
}
