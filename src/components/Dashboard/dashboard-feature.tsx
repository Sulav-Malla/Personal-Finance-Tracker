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
import generalSource from "../../assets/general-source.svg";
import rentExpense from "../../assets/rent-expense.svg";
import groceryExpense from "../../assets/grocery-expense.svg";
import entertainmentExpense from "../../assets/entertain-expense.svg";
import totalExpense from "../../assets/total-expense.svg";

import goalOneIcon from "../../assets/goal-one-icon.svg";
import goalTwoIcon from "../../assets/goal-two-icon.svg";
import savingsProgress from "../../assets/saving-progress.svg";
import depositIcon from "../../assets/deposit-icon.svg";
import totalSavings from "../../assets/possible-savings-icon.svg";
import equalIcon from "../../assets/equal-icon.svg";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function DashboardFeature() {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const income = useSelector((state: RootState) => state.income);
  const expenses = useSelector((state: RootState) => state.expenses);
  const savings = useSelector((state: RootState) => state.savings);

  const top3IncomeSources = [...income.incomeSources]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const otherIncomeSourcesTotal =
    income.totalIncome -
    top3IncomeSources.reduce((acc, source) => acc + source.amount, 0);

  const top3ExpenseCategories = [...expenses.history]
    .reduce((acc, expense) => {
      const category = acc.find((cat) => cat.category === expense.category);
      if (category) {
        category.amount += expense.amount;
      } else {
        acc.push({ category: expense.category, amount: expense.amount });
      }
      return acc;
    }, [] as { category: string; amount: number }[])
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const otherExpenseCategoriesTotal =
    expenses.totalExpense -
    top3ExpenseCategories.reduce((acc, category) => acc + category.amount, 0);

  const incomeSourceData = {
    labels: [...top3IncomeSources.map((income) => income.type), "Other"],
    datasets: [
      {
        data: [
          ...top3IncomeSources.map((income) => income.amount),
          otherIncomeSourcesTotal,
        ],
        backgroundColor: ["#000000", "#008000", "#FFD700", "#FF8C00"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const expenseSourceData = {
    labels: [
      ...top3ExpenseCategories.map((expense) => expense.category),
      "Other",
    ],
    datasets: [
      {
        data: [
          ...top3ExpenseCategories.map((expense) => expense.amount),
          otherExpenseCategoriesTotal,
        ],
        backgroundColor: ["#B22222", "#4B0082", "#4682B4", "#2E8B57"],
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

  const possibleSavings = income.totalIncome - expenses.totalExpense;
  const top2Goals = savings.savingsGoals.slice(0, 2);

  const calculateProgress = (currentAmount: number, targetAmount: number) => {
    return (currentAmount / targetAmount) * 100;
  };

  return (
    <div>
      <header className="text-4xl font-bold m-1 p-0 border-0 ml-10 font-[Merriweather]">
        Dashboard Overview
      </header>
      <div className="flex mt-2">
        {/* Income Card */}
        <div className="bg-white w-[540px] h-[300px] rounded-[30px] m-1 ml-10 p-4 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={totalIncome}
                alt="Total Income"
                className="w-10 h-10 mr-2"
              />
              <h2 className="text-2xl font-bold font-[Playfair]">
                Overall Earnings
              </h2>
            </div>
            <p className="text-xl font-[Roboto]">${income.totalIncome}</p>
            <div className="flex items-center mt-6 mb-4">
              <img
                src={differentSources}
                alt="Revenue Streams"
                className="w-8 h-8 mr-2"
              />
              <h3 className="text-xl font-bold mb font-[Playfair]">
                Earning Streams
              </h3>
            </div>
            <ul className="font-[Roboto]">
              {top3IncomeSources.map((income, index) => (
                <li
                  key={income.id}
                  className="text-lg"
                  style={{
                    color: ["#000000", "#008000", "#FFD700", "#FF8C00"][
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
                        : income.type === "Investments"
                        ? investSource
                        : giftSource
                    }
                    alt={income.type}
                    className="w-6 h-6 inline mr-2"
                  />
                  {income.type}: ${income.amount}
                </li>
              ))}
              <li className="text-lg" style={{ color: "#FF8C00" }}>
                <img
                  src={generalSource}
                  alt="Other"
                  className="w-6 h-6 inline mr-2"
                />
                Other: ${otherIncomeSourcesTotal}
              </li>
            </ul>
          </div>
          <div className="w-[250px] h-[250px] flex-shrink-0 ">
            <Pie data={incomeSourceData} options={pieOptions} />
          </div>
        </div>

        {/* Expenses Card Check*/}
        <div className="bg-white w-[540px] h-[300px] rounded-[30px] m-1 p-4 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={totalExpense}
                alt="Total Expenses"
                className="w-10 h-10 mr-2"
              />
              <h2 className="text-2xl font-bold font-[Playfair]">
                Overall Spending
              </h2>
            </div>
            <p className="text-xl font-[Roboto]">${expenses.totalExpense}</p>
            <div className="flex items-center mt-6 mb-4">
              <img
                src={differentSources}
                alt="Expense Categories"
                className="w-8 h-8 mr-2"
              />
              <h3 className="text-xl font-bold mb font-[Playfair]">
                Spending Categories
              </h3>
            </div>
            <ul className="font-[Roboto]">
              {top3ExpenseCategories.map((expense, index) => (
                <li
                  key={expense.category}
                  className="text-lg"
                  style={{
                    color: ["#B22222", "#4B0082", "#4682B4", "#2E8B57"][
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
              <li className="text-lg" style={{ color: "#2E8B57" }}>
                <img
                  src={generalSource}
                  alt="Other"
                  className="w-6 h-6 inline mr-2"
                />
                Other: ${otherExpenseCategoriesTotal}
              </li>
            </ul>
          </div>
          <div className="w-[250px] h-[250px] flex-shrink-0">
            <Pie data={expenseSourceData} options={pieOptions} />
          </div>
        </div>
      </div>
      <div className="flex mt-2">
        {/* Savings Card */}
        <div className="bg-white w-[540px] h-[300px] rounded-[30px] m-1 ml-10 p-4">
          <div className="flex items-center">
            <img
              src={totalSavings}
              alt="Total Savings"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-bold font-[Playfair]">
              Possible Savings
            </h2>
          </div>
          <div className="flex flex-row mt-4">
            <img src={equalIcon} alt="Total Savings" className="w-8 h-8 mr-2" />
            <p className="text-4xl font-[Merriweather]">${possibleSavings}</p>
          </div>

          <div className="flex items-center mt-4 mb-2">
            <img
              src={savingsProgress}
              alt="Savings Progress"
              className="w-8 h-8 mr-2"
            />
            <h3 className="text-xl font-bold font-[Playfair]">Goals</h3>
          </div>
          <ul className="font-[Roboto]">
            {top2Goals.map((goal, index) => (
              <li key={goal.id} className="text-lg mb-2">
                <div className="flex items-center">
                  <img
                    src={index === 0 ? goalOneIcon : goalTwoIcon}
                    alt={goal.name}
                    className="w-6 h-6 inline mr-2"
                  />
                  <span>
                    {goal.name}: ${goal.currentAmount} / ${goal.targetAmount}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4 mt-1">
                  <div
                    className="bg-black h-4 rounded-full"
                    style={{
                      width: `${calculateProgress(
                        goal.currentAmount,
                        goal.targetAmount
                      )}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Recent Transactions */}
        <div className="bg-white w-[540px] h-[300px] rounded-[30px] m-1 p-4">
          <div className="flex items-center">
            <img
              src={depositIcon}
              alt="Recent Transactions"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-bold font-[Playfair]">
              Recent Transactions
            </h2>
          </div>
          <ul className="mt-4 font-[Roboto]">
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
                <div className="text-sm text-black-600 mt-1 flex justify-between">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  <span
                    className={
                      transaction.status === "Completed"
                        ? "text-green-900"
                        : "text-yellow-900"
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
