import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./flags32-both.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
localStorage.setItem("improvedScoring", false);
localStorage.setItem("improvedFlagging", false);
localStorage.setItem("improvedResult", false);
localStorage.setItem("improvedQuestions", false);
if(!localStorage.getItem('profile')){
    // 70% users profile = rest, 30% users profile pilots
    const number = Math.floor(Math.random() * 10) + 1
    let profile = ''
    number < 7 ? profile = 'rest' : profile = 'pilots'
    localStorage.setItem('profile', profile)
}

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
