// add entries
export const addEntry = (type, details) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://financial-management.krunalmandlekar.repl.co/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      }
    );
    const data = await response.json();

    type === "income"
      ? dispatch({ type: "ADD_INCOME_SUCCESS", payload: data })
      : type === "expense"
      ? dispatch({ type: "ADD_EXPENSE_SUCCESS", payload: data })
      : type === "saving"
      ? dispatch({ type: "ADD_SAVING_SUCCESS", payload: data })
      : dispatch({ type: "ADD_FAILURE" });
  } catch (error) {
    console.log("Error while adding entry!", error);
    dispatch({ type: "ADD_ENTRY_FAILURE" });
  }
};

// fetch income
export const fetchIncome = () => async (dispatch) => {
  try {
    dispatch({ type: "INITIATE_LOADING" });
    const response = await fetch(
      "https://financial-management.krunalmandlekar.repl.co/income"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_INCOME_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error while fetching income data!", error);
    dispatch({ type: "FETCH_INCOME_FAILURE" });
  }
};

// fetch expense
export const fetchExpense = () => async (dispatch) => {
  try {
    dispatch({ type: "INITIATE_LOADING" });
    const response = await fetch(
      "https://financial-management.krunalmandlekar.repl.co/expense"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_EXPENSE_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error while fetching expense data!", error);
    dispatch({ type: "FETCH_EXPENSE_FAILURE" });
  }
};

// fetch savings
export const fetchSaving = () => async (dispatch) => {
  try {
    dispatch({ type: "INITIATE_LOADING" });
    const response = await fetch(
      "https://financial-management.krunalmandlekar.repl.co/saving"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SAVING_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error while fetching savings data!", error);
    dispatch({ type: "FETCH_SAVING_FAILURE" });
  }
};
