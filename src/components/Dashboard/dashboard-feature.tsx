import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import freelanceSource from "../../assets/freelance-source.svg";
import salarySource from "../../assets/salary-source.svg";
import investSource from "../../assets/invest-source.svg";
import giftSource from "../../assets/gift-source.svg";
import totalIncome from "../../assets/total-income.svg";
import differentSources from "../../assets/different-sources.svg";
import rentExpense from "../../assets/rent-expense.svg";
import groceryExpense from "../../assets/grocery-expense.svg";
import entertainmentExpense from "../../assets/entertain-expense.svg";
import totalExpense from "../../assets/total-expense.svg";
import averageExpense from "../../assets/average-expense.svg";
import vacationFund from "../../assets/vacation-fund.svg";
import emergencyFund from "../../assets/emergency-fund.svg";
import totalSavings from "../../assets/total-savings.svg";
import monthlyContribution from "../../assets/monthly-contribution.svg";
import savingsProgress from "../../assets/saving-progress.svg";
import depositIcon from "../../assets/deposit-icon.svg";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function DashboardFeature() {
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const incomeSourceData = {
    labels: dashboard.incomeSources.map((income) => income.type),
    datasets: [
      {
        data: dashboard.incomeSources.map((income) => income.amount),
        backgroundColor: ["#000000", "#FFFFFF", "#FFEB3B", "#FFA500"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const expenseSourceData = {
    labels: dashboard.topExpenseCategories.map((expense) => expense.category),
    datasets: [
      {
        data: dashboard.topExpenseCategories.map((expense) => expense.amount),
        backgroundColor: ["#FF6F61", "#6A0572", "#5DADE2", "#A9DFBF"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <header className="text-4xl font-bold m-1 p-0 border-0 ml-10">
        Dashboard Overview
      </header>
      <div className="flex mt-2">
        {/* Income Card */}
        <div className="bg-[#57A773] w-[540px] h-[300px] rounded-[30px] m-1 ml-10 p-4 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={totalIncome}
                alt="Total Income"
                className="w-10 h-10 mr-2"
              />
              <h2 className="text-2xl font-bold">Overall Earnings</h2>
            </div>
            <p className="text-xl">${dashboard.totalIncome}</p>
            <div className="flex items-center mt-10">
              <img
                src={differentSources}
                alt="Revenue Streams"
                className="w-8 h-8 mr-2"
              />
              <h3 className="text-xl font-bold">Earning Streams</h3>
            </div>
            <ul>
              {dashboard.incomeSources.map((income, index) => (
                <li
                  key={income.type}
                  className="text-lg"
                  style={{
                    color: ["#000000", "#FFFFFF", "#FFEB3B", "#FFA500"][
                      index % 4
                    ],
                  }}
                >
                  <img
                    src={
                      income.type === "Freelance"
                        ? freelanceSource
                        : income.type === "Salary"
                        ? salarySource
                        : income.type === "Investment"
                        ? investSource
                        : giftSource
                    }
                    alt={income.type}
                    className="w-6 h-6 inline mr-2"
                  />
                  {income.type}: ${income.amount}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[250px] h-[250px] flex-shrink-0 ">
            <Pie data={incomeSourceData} options={pieOptions} />
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-[#DB5461] w-[540px] h-[300px] rounded-[30px] m-1 p-4 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={totalExpense}
                alt="Total Expenses"
                className="w-10 h-10 mr-2"
              />
              <h2 className="text-2xl font-bold">Overall Spending</h2>
            </div>
            <p className="text-xl">${dashboard.totalExpenses}</p>
            <div className="flex items-center mt-10">
              <img
                src={differentSources}
                alt="Expense Categories"
                className="w-8 h-8 mr-2"
              />
              <h3 className="text-xl font-bold">Spending Categories</h3>
            </div>
            <ul>
              {dashboard.topExpenseCategories.map((expense, index) => (
                <li
                  key={expense.category}
                  className="text-lg"
                  style={{
                    color: ["#FF6F61", "#6A0572", "#5DADE2", "#A9DFBF"][
                      index % 4
                    ],
                  }}
                >
                  <img
                    src={
                      expense.category === "Rent"
                        ? rentExpense
                        : expense.category === "Groceries"
                        ? groceryExpense
                        : entertainmentExpense
                    }
                    alt={expense.category}
                    className="w-6 h-6 inline mr-2"
                  />
                  {expense.category}: ${expense.amount}
                </li>
              ))}
            </ul>
            <div className="flex items-center mt-4">
              <img
                src={averageExpense}
                alt="Average Spending"
                className="w-8 h-8 mr-2"
              />
              <p className="text-xl">
                Weekly Avg: ${dashboard.averageWeeklySpending}
              </p>
            </div>
          </div>
          <div className="w-[250px] h-[250px] flex-shrink-0">
            <Pie data={expenseSourceData} options={pieOptions} />
          </div>
        </div>
      </div>
      <div className="flex mt-2">
        {/* Savings Card */}
        <div className="bg-[#20A4F3] w-[540px] h-[300px] rounded-[30px] m-1 ml-10 p-4">
          <div className="flex items-center">
            <img
              src={totalSavings}
              alt="Total Savings"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-bold">Saving Progress..</h2>
          </div>
          <p className="text-xl">${dashboard.totalSavings}</p>
          <div className="flex items-center mt-4">
            <img
              src={savingsProgress}
              alt="Savings Progress"
              className="w-8 h-8 mr-2"
            />
            <h3 className="text-xl font-bold">Goals</h3>
          </div>
          <ul>
            {dashboard.savingGoals.map((goal) => {
              const progressPercentage = Math.min(
                (goal.contributed / goal.amount) * 100,
                100
              );

              return (
                <li key={goal.goal} className="text-lg mb-2">
                  <div className="flex items-center">
                    <img
                      src={
                        goal.goal === "Emergency Fund"
                          ? emergencyFund
                          : goal.goal === "Vacation"
                          ? vacationFund
                          : ""
                      }
                      alt={goal.goal}
                      className="w-6 h-6 inline mr-2"
                    />
                    <span>
                      {goal.goal}: ${goal.contributed} / ${goal.amount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4 mt-1">
                    <div
                      className="bg-black h-4 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center mt-4">
            <img
              src={monthlyContribution}
              alt="Monthly Contribution"
              className="w-8 h-8 mr-2"
            />
            <p className="text-xl">
              Average Monthly Contribution: $
              {dashboard.averageMonthlyContribution}
            </p>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="bg-[#FFB800] w-[540px] h-[300px] rounded-[30px] m-1 p-4">
          <div className="flex items-center">
            <img
              src={depositIcon}
              alt="Recent Transactions"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-bold">Recent Transactions</h2>
          </div>
          <ul className="mt-4">
            {dashboard.recentTransactions.map((transaction, index) => (
              <li key={index} className="text-lg mb-4">
                <div className="flex justify-between">
                  <span>{transaction.description}</span>
                  <span
                    className={
                      transaction.type === "Deposit"
                        ? "text-green-900"
                        : "text-red-900"
                    }
                  >
                    ${transaction.amount}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1 flex justify-between">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  <span
                    className={
                      transaction.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {transaction.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardFeature;
