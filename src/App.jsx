import React, { useState } from "react";
import Header from "./Homepage/header";
import Body from "./Homepage/body";
import Footer from "./Homepage/footer";
import Login from "./Homepage/login";
import Dashboard from "./Homepage/dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("EN");

  return (
    <div className="app">
      {page === "home" && <>
        <Header onLogin={() => setPage("login")} lang={lang} setLang={setLang} />
        <Body onLogin={() => setPage("login")} lang={lang} />
        <Footer />
      </>}
      {page === "login" && <Login onBack={() => setPage("home")} onLogin={() => setPage("dashboard")} lang={lang} />}
      {page === "dashboard" && <Dashboard onLogout={() => setPage("home")} onHome={() => setPage("home")} lang={lang} setLang={setLang} />}
    </div>
  );
}
