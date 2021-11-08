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
/* localStorage.setItem("cookies", false); */

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
