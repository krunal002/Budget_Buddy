import "./styles.css";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import Expense from "./Pages/Expense/expense";
import Income from "./Pages/Income/income";
import Saving from "./Pages/Saving/saving";
import FinancialReports from "./Pages/Reports/reports";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/saving" element={<Saving />} />
          <Route path="/reports" element={<FinancialReports />} />
        </Routes>
      </div>
    </div>
  );
}
