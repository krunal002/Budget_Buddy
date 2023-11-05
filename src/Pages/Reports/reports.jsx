import "./reports.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpense, fetchIncome, fetchSaving } from "../../Services/action";
import { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FinancialReports = () => {
  const dispatch = useDispatch();

  const [generate, setGenerate] = useState(false);
  const generatereports = () => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
    dispatch(fetchSaving());
    setGenerate(true);
  };

  const [reportCategory, setReportCategory] = useState("");

  const handleChange = (event) => {
    setReportCategory(event.target.value);
    setGenerate(false);
  };

  const { income, expense, saving } = useSelector((state) => state);
  const totalIncome = income.reduce((acc, { amount }) => acc + amount, 0);
  const totalExpense = expense.reduce((acc, { amount }) => acc + amount, 0);
  const totalSaving = saving.reduce((acc, { amount }) => acc + amount, 0);

  const uniqueCategories = [...new Set(expense.map((item) => item.category))];

  return (
    <div>
      <h2>Reports</h2>

      <div className="report-manager">
        <Box sx={{ width: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Financial Reports
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reportCategory}
              label="Financial Reports"
              onChange={handleChange}
            >
              <MenuItem value={"incExp"}>Income vs Expenses</MenuItem>
              <MenuItem value={"expBre"}>Expense Breakdown</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--primary-color)" }}
          onClick={generatereports}
        >
          Generate Report
        </Button>
      </div>

      <div
        style={
          reportCategory === "incExp"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <h1>Income vs Expenses</h1>
        {!generate ? (
          <p>Please press GENERATE REPORT button!</p>
        ) : (
          <div className="report-table">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableRow>
                  <TableCell align="left">Total Income</TableCell>
                  <TableCell align="right">
                    <b>₹ {totalIncome}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Total Expense</TableCell>
                  <TableCell align="right">
                    <b>₹ {totalExpense}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Total Saving</TableCell>
                  <TableCell align="right">
                    <b>₹ {totalSaving}</b>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>

      <div
        style={
          reportCategory === "expBre"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <h1>Expense Breakdown</h1>
        {!generate ? (
          <p>Please press GENERATE REPORT button!</p>
        ) : (
          <div className="report-table">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "lightGray" }}>
                  <TableRow>
                    <TableCell align="left">
                      <b>Categories</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Total</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {uniqueCategories.map((expenseCategory) => (
                  <TableRow>
                    <TableCell align="left">{expenseCategory}</TableCell>
                    <TableCell align="right">
                      ₹{" "}
                      {expense.reduce(
                        (acc, { amount, category }) =>
                          expenseCategory === category ? acc + amount : acc,
                        0
                      )}{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};
export default FinancialReports;
