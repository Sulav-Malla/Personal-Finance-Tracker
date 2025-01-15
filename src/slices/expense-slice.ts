import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IExpenseCategory {
  id: string;
  type: string;
  amount: number;
  recurring: boolean;
}

interface IExpense {
  id: number;
  date: string;
  description: string;
  paymentMethod: string;
  category: string;
  amount: number;
}

interface IExpenseState {
  history: IExpense[];
  totalExpense: number;
  monthlyComparison: { month: string; amount: number }[];
  filteredExpenses: IExpense[];
}

const initialState: IExpenseState = {
  history: [
    {
      id: 1,
      date: "2025-01-01",
      description: "Rent payment for the month of January",
      paymentMethod: "Credit Card",
      category: "Rent",
      amount: 1200,
    },
    {
      id: 2,
      date: "2025-01-03",
      description: "Weekly groceries shopping at the local market",
      paymentMethod: "Debit Card",
      category: "Groceries",
      amount: 250,
    },
    {
      id: 3,
      date: "2025-01-05",
      description: "Movie tickets and snacks for a weekend outing",
      paymentMethod: "Cash",
      category: "Entertainment",
      amount: 100,
    },
    {
      id: 4,
      date: "2025-01-07",
      description: "Public transport card recharge for daily commuting",
      paymentMethod: "Debit Card",
      category: "Transportation",
      amount: 50,
    },
    {
      id: 5,
      date: "2025-01-10",
      description: "Grocery shopping for the week at a discount store",
      paymentMethod: "Credit Card",
      category: "Groceries",
      amount: 200,
    },
    {
      id: 6,
      date: "2025-01-12",
      description: "Dinner at a local restaurant with friends",
      paymentMethod: "Cash",
      category: "Entertainment",
      amount: 80,
    },
    {
      id: 7,
      date: "2025-01-14",
      description: "Uber ride from home to work",
      paymentMethod: "Debit Card",
      category: "Transportation",
      amount: 40,
    },
    {
      id: 8,
      date: "2025-01-16",
      description: "Rent payment for the second half of January",
      paymentMethod: "Credit Card",
      category: "Rent",
      amount: 1200,
    },
    {
      id: 9,
      date: "2025-01-18",
      description: "Groceries for the weekend including snacks and drinks",
      paymentMethod: "Debit Card",
      category: "Groceries",
      amount: 150,
    },
    {
      id: 10,
      date: "2025-01-20",
      description: "Concert tickets for an upcoming music festival",
      paymentMethod: "Cash",
      category: "Entertainment",
      amount: 120,
    },
    {
      id: 11,
      date: "2025-01-22",
      description: "Bus fare for commuting to work for the week",
      paymentMethod: "Debit Card",
      category: "Transportation",
      amount: 25,
    },
    {
      id: 12,
      date: "2025-01-24",
      description: "Electricity bill payment for the month of January",
      paymentMethod: "Debit Card",
      category: "Utilities",
      amount: 180,
    },
    {
      id: 13,
      date: "2025-01-26",
      description: "Subscription to a streaming service for entertainment",
      paymentMethod: "Credit Card",
      category: "Entertainment",
      amount: 15,
    },
    {
      id: 14,
      date: "2025-01-28",
      description: "Payment for a home cleaning service",
      paymentMethod: "Debit Card",
      category: "Home",
      amount: 60,
    },
  ],

  totalExpense: 4640,
  monthlyComparison: [
    { month: "January", amount: 5000 },
    { month: "February", amount: 4500 },
    { month: "March", amount: 4200 },
  ],
  filteredExpenses: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    filterExpensesByPaymentMethod: (state, action: PayloadAction<string>) => {
      state.filteredExpenses = state.history.filter(
        (expense) => expense.paymentMethod === action.payload
      );
    },
    filterExpensesByDate: (state, action: PayloadAction<string>) => {
      state.filteredExpenses = state.history.filter((expense) =>
        expense.date.includes(action.payload)
      );
    },
    filterExpensesByCategory: (state, action: PayloadAction<string>) => {
      state.filteredExpenses = state.history.filter(
        (expense) => expense.category === action.payload
      );
    },
    setTotalExpense: (state) => {
      state.totalExpense = state.history.reduce(
        (total, expense) => total + expense.amount,
        0
      );
    },
    addExpense: (state, action: PayloadAction<IExpense>) => {
      state.history.push(action.payload);
      state.totalExpense += action.payload.amount;
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      const expenseToRemove = state.history.find(
        (expense) => expense.id === action.payload
      );
      if (expenseToRemove) {
        state.totalExpense -= expenseToRemove.amount;
        state.history = state.history.filter(
          (expense) => expense.id !== action.payload
        );
      }
    },
  },
});

export const {
  filterExpensesByPaymentMethod,
  filterExpensesByDate,
  filterExpensesByCategory,
  setTotalExpense,
  addExpense,
  removeExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
