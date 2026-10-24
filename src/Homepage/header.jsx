import React from "react";
import "./header.css";

export default function Header({ onLogin, lang, setLang }) {
  const hi = lang === "HI";
  return <header className="site-header">
    <div className="header-container">
      <button className="brand brand-home-button" onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="RationSaathi home">
        <span className="brand-logo">🛡️</span>
        <span className="brand-name">Ration<span>Saathi</span></span>
      </button>
      <nav className="nav-links">
        <a href="#about">{hi ? "हमारे बारे में" : "About"}</a>
        <a href="#features">{hi ? "मुख्य सुविधाएँ" : "Features"}</a>
        <a href="#contact">{hi ? "संपर्क" : "Contact"}</a>
        <button className="login-btn" onClick={onLogin}>{hi ? "लॉग इन" : "Login"}</button>
        <button className="language-btn" onClick={() => setLang(hi ? "EN" : "HI")} title="Switch language">{hi ? "हिंदी ✓" : "हिंदी ↔ EN"}</button>
      </nav>
    </div>
  </header>;
}
