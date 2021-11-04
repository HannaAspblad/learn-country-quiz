import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./flags32-both.css";
import App from "./App";

localStorage.setItem("improvedScoring", false);
localStorage.setItem("improvedFlagging", false);
localStorage.setItem("improvedResult", false);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
