import "./expense.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpense } from "../../Services/action";
import { format } from "date-fns";
import AddData from "../../Components/addData";

// mui
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpenseLogo from "@mui/icons-material/TrendingDown";

const Expense = () => {
  const expenseData = useSelector((state) => state.expense);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);

  const dateFormat = "dd MMM yyyy";
  const formattedDate = (currentDate) => format(currentDate, dateFormat);

  const totalExpense = expenseData?.reduce(
    (acc, { amount }) => acc + amount,
    0
  );

  const [sort, setSort] = useState({ increasing: false, decreasing: false });
  const data = [...expenseData];
  const sortedData = sort.increasing
    ? data.sort((a, b) => a.amount - b.amount)
    : sort.decreasing
    ? data.sort((a, b) => b.amount - a.amount)
    : expenseData;

  const uniqueCategories = [
    ...new Set(expenseData.map((item) => item.category))
  ];
  const [category, setCategory] = useState("");
  const filteredData =
    category === ""
      ? sortedData
      : sortedData.filter((data) => data.category === category);

  return (
    <div>
      <div className="expense-header">
        <h1>Expense</h1>
        <div className="operator-container">
          <div className="sort-data-container">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={sort.increasing} />}
                label="Increasing"
                onChange={() =>
                  setSort({ increasing: !sort.increasing, decreasing: false })
                }
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={sort.decreasing} />}
                label="Decreasing"
                onChange={() =>
                  setSort({ increasing: false, decreasing: !sort.decreasing })
                }
              />
            </FormGroup>
          </div>

          <div>
            <select
              className="category-container"
              labelId="sort-label"
              id="sort-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}>Category</option>
              {uniqueCategories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="skeleton-container">
          <CircularProgress color="error" />
        </div>
      ) : (
        <div className="primary-expense-container">
          <div className="expense-container">
            {filteredData?.map((expense) => (
              <div key={expense._id} className="expense-wrapper">
                <div className="expense-logo">
                  <ExpenseLogo />
                </div>
                <div className="expense-details">
                  <div className="text-ellipsis">{expense.description}</div>
                  <div>
                    <small>{formattedDate(new Date(expense.date))}</small>
                  </div>
                </div>
                <div className="expense-amount">
                  <p>₹{expense.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="total-expense-container">
              <p style={{ textAlign: "left" }}>Total Expense : </p>
              <h1>₹{totalExpense}</h1>
              <p style={{ textAlign: "right" }}>
                <small>( INR - Indian Rupee )</small>
              </p>
            </div>
            <div>
              <AddData type={"expense"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Expense;
