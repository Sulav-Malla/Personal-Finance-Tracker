import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function DashboardFeature() {
  const dashboard = useSelector((state: RootState) => state.dashboard);

  return (
    <div>
      <header className="text-4xl font-bold m-1 p-0 border-0 ml-10">
        Dashboard
      </header>
      <div className="flex mt-2">
        <div className="bg-green-500 w-[540px] h-[300px] rounded-[30px] m-1 ml-10 p-4">
          <h2 className="text-2xl font-bold">Total Income</h2>
          <p className="text-xl">${dashboard.totalIncome}</p>
          <h3 className="text-xl font-bold mt-4">Income Sources</h3>
          <ul>
            {dashboard.incomeSources.map((income) => (
              <li key={income.type} className="text-lg">
                {income.type}: ${income.amount}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-500 w-[540px] h-[300px] rounded-[30px] m-1 p-4">
          <h2 className="text-2xl font-bold">Total Expenses</h2>
          <p className="text-xl">${dashboard.totalExpenses}</p>
          <h3 className="text-xl font-bold mt-4">Top Expense Categories</h3>
          <ul>
            {dashboard.topExpenseCategories.map((expense) => (
              <li key={expense.category} className="text-lg">
                {expense.category}: ${expense.amount}
              </li>
            ))}
          </ul>
          <p className="text-xl mt-4">
            Average Weekly Spending: ${dashboard.averageWeeklySpending}
          </p>
        </div>
      </div>
      <div className="flex mt-2">
        <div className="bg-blue-500 w-[540px] h-[300px] rounded-[30px] m-1 ml-10 p-4">
          <h2 className="text-2xl font-bold">Total Savings</h2>
          <p className="text-xl">${dashboard.totalSavings}</p>
          <h3 className="text-xl font-bold mt-4">Saving Goals</h3>
          <ul>
            {dashboard.savingGoals.map((goal) => (
              <li key={goal.goal} className="text-lg">
                {goal.goal}: ${goal.contributed} / ${goal.amount}
              </li>
            ))}
          </ul>
          <p className="text-xl mt-4">
            Average Monthly Contribution: $
            {dashboard.averageMonthlyContribution}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardFeature;
