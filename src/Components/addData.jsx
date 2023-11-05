import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { useDispatch } from "react-redux";
import { addEntry } from "../Services/action";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddData({ type }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const initialState = {
    description: "",
    category: "",
    date: "",
    amount: ""
  };
  const [details, setDetails] = React.useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDetails(initialState);
    setOpen(false);
  };

  const submitData = () => {
    if (details.name === "") {
      alert("Fill all the fields!");
    } else {
      dispatch(addEntry(type, details));
      setOpen(false);
      setDetails(initialState);
    }
  };
  return (
    <div>
      <button className="add-data-wrapper" onClick={handleClickOpen}>
        <div className="add-border">
          <AddCircleIcon sx={{ fontSize: 80, color: "gray" }} />
        </div>
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Income"}</DialogTitle>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "30ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              value={details.description}
              onChange={(e) =>
                setDetails({ ...details, description: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Category"
              variant="standard"
              value={details.category}
              onChange={(e) =>
                setDetails({ ...details, category: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              type="number"
              id="standard-basic"
              label="Amount"
              variant="standard"
              value={details.amount}
              onChange={(e) =>
                setDetails({ ...details, amount: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              type="date"
              id="standard-basic"
              label=""
              variant="standard"
              value={details.date}
              onChange={(e) => setDetails({ ...details, date: e.target.value })}
            />
          </div>
        </Box>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={submitData} color="success" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
