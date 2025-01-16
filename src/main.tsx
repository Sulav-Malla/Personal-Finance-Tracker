import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavLayout } from "./components/Navigation/layout";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Expenses = lazy(() => import("./pages/expenses"));
const Income = lazy(() => import("./pages/income"));
const Savings = lazy(() => import("./pages/savings"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<NavLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/manage-income" element={<Income />} />
              <Route path="/savings-goal" element={<Savings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
