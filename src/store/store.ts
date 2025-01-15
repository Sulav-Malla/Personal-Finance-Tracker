import { configureStore } from "@reduxjs/toolkit";
import incomeSlice from "../slices/income-slice";
import expenseSlice from "../slices/expense-slice";
import savingsSlice from "../slices/savings-slice";
export const store = configureStore({
  reducer: {
    income: incomeSlice,
    expenses: expenseSlice,
    savings: savingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
