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
  recentTransactions: ITransaction[];
}

const initialState: IDashboard = {
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
    setRecentTransactions(state, action: PayloadAction<ITransaction[]>) {
      state.recentTransactions = action.payload;
    },
  },
});

export const { setRecentTransactions } = dashboardSlice.actions;
export default dashboardSlice.reducer;
