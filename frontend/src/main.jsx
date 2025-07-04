import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { AddWord } from "./components/ui/AddWord.jsx";
import { WordBank } from "./components/ui/WordBank.jsx";
import { Practice } from "./components/ui/Practice.jsx";
import { Settings } from "./components/ui/Settings.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-word" element={<AddWord />} />
          <Route path="word-bank" element={<WordBank />} />
          <Route path="practice" element={<Practice />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
