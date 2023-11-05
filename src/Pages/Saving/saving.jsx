import "./saving.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSaving } from "../../Services/action";
import { format } from "date-fns";
import AddData from "../../Components/addData";

// mui
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SavingsIcon from "@mui/icons-material/Savings";

const Saving = () => {
  const savingData = useSelector((state) => state.saving);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSaving());
  }, [dispatch]);

  const dateFormat = "dd MMM yyyy";
  const formattedDate = (currentDate) => format(currentDate, dateFormat);

  const totalSaving = savingData?.reduce((acc, { amount }) => acc + amount, 0);

  const [sort, setSort] = useState({ increasing: false, decreasing: false });
  const data = [...savingData];
  const sortedData = sort.increasing
    ? data.sort((a, b) => a.amount - b.amount)
    : sort.decreasing
    ? data.sort((a, b) => b.amount - a.amount)
    : savingData;

  const uniqueCategories = [
    ...new Set(savingData.map((item) => item.category))
  ];
  const [category, setCategory] = useState("");
  const filteredData =
    category === ""
      ? sortedData
      : sortedData.filter((data) => data.category === category);

  return (
    <div>
      <div className="saving-header">
        <h1>Saving</h1>
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
          <CircularProgress />
        </div>
      ) : (
        <div className="primary-saving-container">
          <div className="saving-container">
            {filteredData?.map((saving) => (
              <div key={saving._id} className="saving-wrapper">
                <div className="saving-logo">
                  <SavingsIcon />
                </div>
                <div className="saving-details">
                  <div className="text-ellipsis">{saving.description}</div>
                  <div>
                    <small>{formattedDate(new Date(saving.date))}</small>
                  </div>
                </div>
                <div className="saving-amount">
                  <p>₹{saving.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="total-saving-container">
              <p style={{ textAlign: "left" }}>Total Saving : </p>
              <h1>₹{totalSaving}</h1>
              <p style={{ textAlign: "right" }}>
                <small>( INR - Indian Rupee )</small>
              </p>
            </div>
            <div>
              <AddData type={"saving"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Saving;
