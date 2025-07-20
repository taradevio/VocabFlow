import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { PracticeProvider } from "./context/PracticeProvider.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { AddWord } from "./components/ui/AddWord.jsx";
import { WordBank } from "./components/ui/WordBank.jsx";
import { Practice } from "./components/ui/Practice.jsx";
import { Settings } from "./components/ui/Settings.jsx";
import { PracticeArea } from "./components/ui/PracticeArea.jsx";
import { Login } from "./components/Login.jsx";
import { Analytics } from "./components/ui/Analytics.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <PracticeProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="analytics" element={<Analytics />} />
              <Route path="add-word" element={<AddWord />} />
              <Route path="word-bank" element={<WordBank />} />
              <Route path="practice" element={<Practice />} />
              <Route path="settings" element={<Settings />} />
              <Route path="practice/practice-area" element={<PracticeArea />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </PracticeProvider>
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
