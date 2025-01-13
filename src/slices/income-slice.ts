import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IIncomeSource {
  id: string;
  type: string;
  amount: number;
  recurring: boolean;
}

interface IIncomeHistory {
  id: string;
  date: string;
  amount: number;
  source: string;
}

interface IIncomeState {
  totalIncome: number;
  monthlyComparison: { month: string; amount: number }[];
  incomeSources: IIncomeSource[];
  incomeHistory: IIncomeHistory[];
}

const initialState: IIncomeState = {
  totalIncome: 5000,
  monthlyComparison: [
    { month: "January", amount: 4000 },
    { month: "February", amount: 4500 },
    { month: "March", amount: 5000 },
  ],
  incomeSources: [
    { id: "1", type: "Salary", amount: 3000, recurring: true },
    { id: "2", type: "Freelance", amount: 1500, recurring: false },
    { id: "3", type: "Investments", amount: 500, recurring: true },
  ],
  incomeHistory: [
    { id: "1", date: "2023-10-01", amount: 3000, source: "Salary" },
    { id: "2", date: "2023-10-15", amount: 1500, source: "Freelance" },
    { id: "3", date: "2023-10-20", amount: 500, source: "Investments" },
  ],
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setTotalIncome(state, action: PayloadAction<number>) {
      state.totalIncome = action.payload;
    },
    setMonthlyComparison(
      state,
      action: PayloadAction<{ month: string; amount: number }[]>
    ) {
      state.monthlyComparison = action.payload;
    },
    setIncomeSources(state, action: PayloadAction<IIncomeSource[]>) {
      state.incomeSources = action.payload;
    },
    addIncomeSource(state, action: PayloadAction<IIncomeSource>) {
      state.incomeSources.push(action.payload);
    },
    removeIncomeSource(state, action: PayloadAction<string>) {
      state.incomeSources = state.incomeSources.filter(
        (source) => source.id !== action.payload
      );
    },
    setIncomeHistory(state, action: PayloadAction<IIncomeHistory[]>) {
      state.incomeHistory = action.payload;
    },
    addIncomeHistory(state, action: PayloadAction<IIncomeHistory>) {
      state.incomeHistory.push(action.payload);
    },
    removeIncomeHistory(state, action: PayloadAction<string>) {
      state.incomeHistory = state.incomeHistory.filter(
        (history) => history.id !== action.payload
      );
    },
  },
});

export const {
  setTotalIncome,
  setMonthlyComparison,
  setIncomeSources,
  addIncomeSource,
  removeIncomeSource,
  setIncomeHistory,
  addIncomeHistory,
  removeIncomeHistory,
} = incomeSlice.actions;
export default incomeSlice.reducer;
