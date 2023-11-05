import "./income.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIncome } from "../../Services/action";
import { format } from "date-fns";
import AddData from "../../Components/addData";

// mui
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IncomeLogo from "@mui/icons-material/TrendingUp";

const Income = () => {
  const incomeData = useSelector((state) => state.income);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncome());
  }, [dispatch]);

  const dateFormat = "dd MMM yyyy";
  const formattedDate = (currentDate) => format(currentDate, dateFormat);

  const totalIncome = incomeData.reduce((acc, { amount }) => acc + amount, 0);

  const [sort, setSort] = useState({ increasing: false, decreasing: false });
  const data = [...incomeData];
  const sortedData = sort.increasing
    ? data.sort((a, b) => a.amount - b.amount)
    : sort.decreasing
    ? data.sort((a, b) => b.amount - a.amount)
    : incomeData;

  const uniqueCategories = [
    ...new Set(incomeData.map((item) => item.category))
  ];
  const [category, setCategory] = useState("");
  const filteredData =
    category === ""
      ? sortedData
      : sortedData.filter((data) => data.category === category);

  return (
    <div>
      <div className="income-header">
        <h1>Income</h1>
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
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="primary-income-container">
          <div className="income-container">
            {filteredData?.map((income) => (
              <div key={income._id} className="income-wrapper">
                <div className="income-logo">
                  <IncomeLogo />
                </div>
                <div className="income-details">
                  <div className="text-ellipsis">{income.description}</div>
                  <div>
                    <small>{formattedDate(new Date(income.date))}</small>
                  </div>
                </div>
                <div className="income-amount">
                  <p>₹{income.amount}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="total-income-container">
              <p style={{ textAlign: "left" }}>Total Income : </p>
              <h1>₹{totalIncome}</h1>
              <p style={{ textAlign: "right" }}>
                <small>( INR - Indian Rupee )</small>
              </p>
            </div>
            <div>
              <AddData type={"income"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Income;
