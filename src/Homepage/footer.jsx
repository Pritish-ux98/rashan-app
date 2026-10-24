import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🛡️</div>
          <div><strong>RationSaathi</strong><p>Your ration. Your rights. Your next step.</p></div>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#features">Privacy</a>
          <a href="#features">Accessibility</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 RationSaathi. Prototype for demonstration purposes.</span>
        <span>Built for accessible public services.</span>
      </div>
    </footer>
  );
}
