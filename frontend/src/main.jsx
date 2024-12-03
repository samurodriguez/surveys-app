import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <header>
      <h1>Surveys App</h1>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
