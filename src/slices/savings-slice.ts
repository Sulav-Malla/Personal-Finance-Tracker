import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

interface ISavingsState {
  savingsGoals: ISavingsGoal[];
  remainingFunds: number;
}

const initialState: ISavingsState = {
  savingsGoals: [
    {
      id: "1",
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 2000,
      targetDate: "2025-06-01",
    },
    {
      id: "2",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 4000,
      targetDate: "2025-12-31",
    },
    {
      id: "3",
      name: "New Laptop",
      targetAmount: 1500,
      currentAmount: 800,
      targetDate: "2025-05-01",
    },
  ],
  remainingFunds: 0,
};

const savingsSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {
    addSavingsGoal(state, action: PayloadAction<ISavingsGoal>) {
      state.savingsGoals.push(action.payload);
    },
    removeSavingsGoal(state, action: PayloadAction<string>) {
      state.savingsGoals = state.savingsGoals.filter(
        (goal) => goal.id !== action.payload
      );
    },
    updateSavingsGoal(
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) {
      const goal = state.savingsGoals.find((g) => g.id === action.payload.id);
      if (goal) {
        goal.currentAmount += action.payload.amount;
      }
    },
    editSavingsGoal(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        targetAmount: number;
        currentAmount: number;
        targetDate: string;
      }>
    ) {
      const goal = state.savingsGoals.find((g) => g.id === action.payload.id);
      if (goal) {
        goal.name = action.payload.name;
        goal.targetAmount = action.payload.targetAmount;
        goal.currentAmount = action.payload.currentAmount;
        goal.targetDate = action.payload.targetDate;
      }
    },
    setRemainingFunds(state, action: PayloadAction<number>) {
      state.remainingFunds = action.payload;
    },
    updateRemainingFunds(state, action: PayloadAction<number>) {
      state.remainingFunds -= action.payload;
    },
  },
});

export const {
  addSavingsGoal,
  removeSavingsGoal,
  updateSavingsGoal,
  editSavingsGoal,
  setRemainingFunds,
  updateRemainingFunds,
} = savingsSlice.actions;
export default savingsSlice.reducer;
