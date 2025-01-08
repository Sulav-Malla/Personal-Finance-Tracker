import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Expenses } from "./pages/expenses";
import { Income } from "./pages/income";
import { Savings } from "./pages/savings";
import { NavLayout } from "./components/Navigation/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="/expenses" element={<Expenses />} />
          <Route path="/manage-income" element={<Income />} />
          <Route path="/savings-goal" element={<Savings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
