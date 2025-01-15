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
  type: string;
}

interface IIncomeState {
  totalIncome: number;
  monthlyComparison: { month: string; amount: number }[];
  incomeSources: IIncomeSource[];
  incomeHistory: IIncomeHistory[];
}

const initialState: IIncomeState = {
  totalIncome: 0,
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
    { id: "1", date: "2023-10-01", amount: 3000, type: "Salary" },
    { id: "2", date: "2023-10-15", amount: 1500, type: "Freelance" },
    { id: "3", date: "2023-10-20", amount: 500, type: "Investments" },
  ],
};

initialState.totalIncome = initialState.incomeSources.reduce(
  (total, source) => total + source.amount,
  0
);

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncomeSource(state, action: PayloadAction<IIncomeSource>) {
      state.incomeSources.push(action.payload);
      state.totalIncome += action.payload.amount;
    },
    removeIncomeSource(state, action: PayloadAction<string>) {
      state.incomeSources = state.incomeSources.filter(
        (source) => source.id !== action.payload
      );
      state.incomeHistory = state.incomeHistory.filter(
        (history) => history.type !== action.payload
      );
    },
    addIncomeHistory(state, action: PayloadAction<IIncomeHistory>) {
      state.incomeHistory.push(action.payload);
      state.totalIncome += action.payload.amount;
      const source = state.incomeSources.find(
        (source) => source.type === action.payload.type
      );
      if (source) {
        source.amount += action.payload.amount;
      }
    },
    removeIncomeHistory(state, action: PayloadAction<string>) {
      const historyToRemove = state.incomeHistory.find(
        (history) => history.id === action.payload
      );
      if (historyToRemove) {
        state.totalIncome -= historyToRemove.amount;
        state.incomeHistory = state.incomeHistory.filter(
          (history) => history.id !== action.payload
        );
        const source = state.incomeSources.find(
          (source) => source.type === historyToRemove.type
        );
        if (source) {
          source.amount -= historyToRemove.amount;
        }
      }
    },
  },
});

export const {
  addIncomeSource,
  removeIncomeSource,
  addIncomeHistory,
  removeIncomeHistory,
} = incomeSlice.actions;
export default incomeSlice.reducer;
