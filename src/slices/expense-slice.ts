import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IExpenseCategory {
  id: string;
  name: string;
}

interface IExpense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface IExpenseHistory {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

interface IExpenseState {
  totalExpenses: number;
  monthlyComparison: { month: string; amount: number }[];
  expenseCategories: IExpenseCategory[];
  expenses: IExpense[];
  expenseHistory: IExpenseHistory[];
}

const initialState: IExpenseState = {
  totalExpenses: 2000,
  monthlyComparison: [
    { month: "January", amount: 1800 },
    { month: "February", amount: 2200 },
    { month: "March", amount: 2000 },
  ],
  expenseCategories: [
    { id: "1", name: "Rent" },
    { id: "2", name: "Utilities" },
    { id: "3", name: "Groceries" },
    { id: "4", name: "Entertainment" },
  ],
  expenses: [
    { id: "1", category: "Rent", amount: 1200, date: "2023-10-01", description: "Monthly rent payment" },
    { id: "2", category: "Utilities", amount: 150, date: "2023-10-05", description: "Electricity bill" },
    { id: "3", category: "Groceries", amount: 400, date: "2023-10-10", description: "Weekly grocery shopping" },
    { id: "4", category: "Entertainment", amount: 250, date: "2023-10-15", description: "Concert tickets" },
  ],
  expenseHistory: [
    { id: "1", date: "2023-10-01", amount: 1200, category: "Rent", description: "Monthly rent payment" },
    { id: "2", date: "2023-10-05", amount: 150, category: "Utilities", description: "Electricity bill" },
    { id: "3", date: "2023-10-10", amount: 400, category: "Groceries", description: "Weekly grocery shopping" },
    { id: "4", date: "2023-10-15", amount: 250, category: "Entertainment", description: "Concert tickets" },
  ],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setTotalExpenses(state, action: PayloadAction<number>) {
      state.totalExpenses = action.payload;
    },
    setMonthlyComparison(
      state,
      action: PayloadAction<{ month: string; amount: number }[]>
    ) {
      state.monthlyComparison = action.payload;
    },
    setExpenseCategories(state, action: PayloadAction<IExpenseCategory[]>) {
      state.expenseCategories = action.payload;
    },
    addExpenseCategory(state, action: PayloadAction<IExpenseCategory>) {
      state.expenseCategories.push(action.payload);
    },
    removeExpenseCategory(state, action: PayloadAction<string>) {
      state.expenseCategories = state.expenseCategories.filter(
        (category) => category.id !== action.payload
      );
    },
    setExpenses(state, action: PayloadAction<IExpense[]>) {
      state.expenses = action.payload;
    },
    addExpense(state, action: PayloadAction<IExpense>) {
      state.expenses.push(action.payload);
    },
    removeExpense(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    setExpenseHistory(state, action: PayloadAction<IExpenseHistory[]>) {
      state.expenseHistory = action.payload;
    },
    addExpenseHistory(state, action: PayloadAction<IExpenseHistory>) {
      state.expenseHistory.push(action.payload);
    },
    removeExpenseHistory(state, action: PayloadAction<string>) {
      state.expenseHistory = state.expenseHistory.filter(
        (history) => history.id !== action.payload
      );
    },
  },
});

export const {
  setTotalExpenses,
  setMonthlyComparison,
  setExpenseCategories,
  addExpenseCategory,
  removeExpenseCategory,
  setExpenses,
  addExpense,
  removeExpense,
  setExpenseHistory,
  addExpenseHistory,
  removeExpenseHistory,
} = expenseSlice.actions;
export default expenseSlice.reducer;
