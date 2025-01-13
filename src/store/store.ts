import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../slices/dashboard-slice";
import incomeSlice from "../slices/income-slice";
import expenseSlice from "../slices/expense-slice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    income: incomeSlice,
    expenses: expenseSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
