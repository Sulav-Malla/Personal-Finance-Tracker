import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IIncomeSource {
  type: string;
  amount: number;
}

interface IExpenseCategory {
  category: string;
  amount: number;
}

interface ISavingGoal {
  goal: string;
  amount: number;
  contributed: number;
}

interface ITransaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  status: string;
}

interface IDashboard {
  totalIncome: number;
  incomeSources: IIncomeSource[];
  totalExpenses: number;
  topExpenseCategories: IExpenseCategory[];
  averageWeeklySpending: number;
  totalSavings: number;
  savingGoals: ISavingGoal[];
  averageMonthlyContribution: number;
  recentTransactions: ITransaction[];
}

const initialState: IDashboard = {
  totalIncome: 5000,
  incomeSources: [
    { type: "Salary", amount: 3000 },
    { type: "Freelance", amount: 1500 },
    { type: "Investments", amount: 500 },
  ],
  totalExpenses: 3000,
  topExpenseCategories: [
    { category: "Rent", amount: 1000 },
    { category: "Groceries", amount: 500 },
    { category: "Entertainment", amount: 300 },
  ],
  averageWeeklySpending: 750,
  totalSavings: 2000,
  savingGoals: [
    { goal: "Emergency Fund", amount: 5000, contributed: 1000 },
    { goal: "Vacation", amount: 2000, contributed: 500 },
  ],
  averageMonthlyContribution: 300,
  recentTransactions: [
    {
      id: 1,
      description: "Walmart Food Purchase",
      amount: 50,
      type: "Expense",
      category: "Food",
      date: "2025-01-12",
      status: "Completed",
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 3000,
      type: "Deposit",
      category: "Salary",
      date: "2025-01-11",
      status: "Completed",
    },
    {
      id: 3,
      description: "Rent Payment",
      amount: 1000,
      type: "Expense",
      category: "Rent",
      date: "2025-01-10",
      status: "Pending",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTotalIncome(state, action: PayloadAction<number>) {
      state.totalIncome = action.payload;
    },
    setIncomeSources(state, action: PayloadAction<IIncomeSource[]>) {
      state.incomeSources = action.payload;
    },
    setTotalExpenses(state, action: PayloadAction<number>) {
      state.totalExpenses = action.payload;
    },
    setTopExpenseCategories(state, action: PayloadAction<IExpenseCategory[]>) {
      state.topExpenseCategories = action.payload;
    },
    setAverageWeeklySpending(state, action: PayloadAction<number>) {
      state.averageWeeklySpending = action.payload;
    },
    setTotalSavings(state, action: PayloadAction<number>) {
      state.totalSavings = action.payload;
    },
    setSavingGoals(state, action: PayloadAction<ISavingGoal[]>) {
      state.savingGoals = action.payload;
    },
    setAverageMonthlyContribution(state, action: PayloadAction<number>) {
      state.averageMonthlyContribution = action.payload;
    },
    setRecentTransactions(state, action: PayloadAction<ITransaction[]>) {
      state.recentTransactions = action.payload;
    },
  },
});

export const {
  setTotalIncome,
  setIncomeSources,
  setTotalExpenses,
  setTopExpenseCategories,
  setAverageWeeklySpending,
  setTotalSavings,
  setSavingGoals,
  setAverageMonthlyContribution,
  setRecentTransactions,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
