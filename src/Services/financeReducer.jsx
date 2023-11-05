const initialState = {
  income: [],
  expense: [],
  saving: [],
  loading: false,
  error: null
};

export const FinanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIATE_LOADING":
      return { ...state, loading: true };

    // income
    case "FETCH_INCOME_SUCCESS":
      return { ...state, income: action.payload, error: null, loading: false };

    case "FETCH_INCOME_FAILURE":
      return { ...state, error: "Error in fetching data!", loading: false };

    case "ADD_INCOME_SUCCESS":
      return {
        ...state,
        income: [...state.income, action.payload],
        loading: false,
        error: null
      };

    case "ADD_INCOME_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error in adding data!"
      };

    case "DELETE_INCOME_SUCCESS":
      return {
        ...state,
        income: state.income.filter((item) => item._id !== action.payload),
        loading: false,
        error: null
      };

    case "DELETE_INCOME_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error in deleting data!"
      };

    // Expense
    case "FETCH_EXPENSE_SUCCESS":
      return { ...state, expense: action.payload, loading: false, error: null };

    case "FETCH_EXPENSE_FAILURE":
      return { ...state, loading: false, error: "Error in fetching data!" };

    case "ADD_EXPENSE_SUCCESS":
      return {
        ...state,
        expense: [...state.expense, action.payload],
        loading: false,
        error: null
      };

    case "ADD_EXPENSE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error in adding data!"
      };

    // savings
    case "FETCH_SAVING_SUCCESS":
      return { ...state, saving: action.payload, loading: false, error: null };

    case "FETCH_SAVING_FAILURE":
      return { ...state, loading: false, error: "Error in fetching data!" };

    case "ADD_SAVING_SUCCESS":
      return {
        ...state,
        saving: [...state.saving, action.payload],
        loading: false,
        error: null
      };

    case "ADD_ENTRY_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error in adding data!"
      };

    default:
      return state;
  }
};
