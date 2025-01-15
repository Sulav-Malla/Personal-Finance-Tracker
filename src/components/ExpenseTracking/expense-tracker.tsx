import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setTotalExpense,
  addExpense,
  removeExpense,
} from "../../slices/expense-slice";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import deleteIcon from "../../assets/delete-icon.svg";
import historyIcon from "../../assets/history-icon.svg";
import addIcon from "../../assets/add-icon.svg";
import showAllIcon from "../../assets/showall-icon.svg";
import collapseIcon from "../../assets/collapse-icon.svg";
import monthIcons from "../../assets/monthIcons";
import firstMedalIcon from "../../assets/first-medal-icon.svg";
import secondMedalIcon from "../../assets/second-medal-icon.svg";
import thirdMedalIcon from "../../assets/third-medal-icon.svg";
import otherMedalIcon from "../../assets/other-medal-icon.svg";
import transportationIcon from "../../assets/transportation-icon.svg";
import homeInsuranceIcon from "../../assets/home-insurance-icon.svg";
import utilitiesIcon from "../../assets/utilities-icon.svg";
import rentExpense from "../../assets/rent-expense.svg";
import groceryExpense from "../../assets/grocery-expense.svg";
import entertainExpense from "../../assets/entertain-expense.svg";
import pointIcon from "../../assets/point-icon.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const categories = [
  "Transportation",
  "Home",
  "Utilities",
  "Rent",
  "Groceries",
  "Entertainment",
];

function ExpenseManagement() {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses);

  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    paymentMethod: "",
    category: categories[0],
    amount: 0,
  });
  const [showHistory, setShowHistory] = useState<string | null>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  // Update total expense whenever history changes
  useEffect(() => {
    dispatch(setTotalExpense());
  }, [expenses.history, dispatch]);

  const handleAddExpense = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpenseData = {
      id: Date.now(),
      ...newExpense,
    };
    dispatch(addExpense(newExpenseData));
    setNewExpense({
      date: "",
      description: "",
      paymentMethod: "",
      category: categories[0],
      amount: 0,
    });
    setShowForm(false);
  };

  const handleRemoveExpense = (id: number) => {
    dispatch(removeExpense(id));
  };

  // Calculate total amount spent per category
  const categoryTotals = expenses.history.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Get the top 3 expense categories
  const top3Categories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, amount]) => ({ category, amount }));

  const otherCategoriesTotal =
    expenses.totalExpense -
    top3Categories.reduce((acc, category) => acc + category.amount, 0);

  const pieChartData = {
    labels: [...top3Categories.map((expense) => expense.category), "Other"],
    datasets: [
      {
        data: [
          ...top3Categories.map((expense) => expense.amount),
          otherCategoriesTotal,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
      },
    ],
  };

  const chartData = {
    labels: expenses.monthlyComparison.map((item) => item.month),
    datasets: [
      {
        label: "Expenses",
        data: expenses.monthlyComparison.map((item) => item.amount),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
      },
    },
  };

  const last3Months = expenses.monthlyComparison.slice(-3).reverse();

  return (
    <div className="p-6 min-h-screen">
      <header className="text-3xl font-bold mb-6 text-gray-800 font-[Merriweather]">
        Expense Management
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section: Total Expenses and Pie Chart */}
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl font-semibold mb-4 text-center font-[Playfair]">
              Total Expenses
            </h2>
            <p className="text-5xl font-bold mb-6 text-center font-[Merriweather]">
              ${expenses.totalExpense}
            </p>
            <div className="h-500 mb-4">
              <Pie data={pieChartData} options={pieOptions} height={400} />
            </div>
          </div>

          {/* Right Section: Expense Categories and Pie Chart Legend */}
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl font-semibold mb-4 font-[Playfair]">
              Expense Categories
            </h2>
            <div className="space-y-4 font-[Roboto]">
              {top3Categories.map((expense, index) => {
                let medalIcon = null;
                let fontWeight = "font-normal";

                if (index === 0) {
                  medalIcon = firstMedalIcon;
                  fontWeight = "font-bold text-yellow-500";
                } else if (index === 1) {
                  medalIcon = secondMedalIcon;
                  fontWeight = "font-semibold text-gray-400";
                } else if (index === 2) {
                  medalIcon = thirdMedalIcon;
                  fontWeight = "font-semibold text-gray-600";
                }

                return (
                  <div
                    key={expense.category}
                    className={`flex items-center space-x-4 mt-4 rounded-lg p-4 ${
                      index < 3 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {medalIcon && (
                      <img
                        src={medalIcon}
                        alt={`${expense.category} medal`}
                        className="w-10 h-10"
                      />
                    )}
                    <div className="flex justify-between w-full">
                      <span className={`text-lg text-black ${fontWeight}`}>
                        {expense.category}
                      </span>
                      <span className={`text-lg text-black ${fontWeight}`}>
                        ${expense.amount || 0}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center space-x-4 mt-4 rounded-lg p-4 bg-gray-100">
                <img
                  src={otherMedalIcon}
                  alt="Other medal"
                  className="w-10 h-10"
                />
                <div className="flex justify-between w-full">
                  <span className="text-lg text-black font-normal">Other</span>
                  <span className="text-lg text-black font-normal">
                    ${otherCategoriesTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* custom legend */}
            <div className="mt-2">
              <h3 className="text-lg font-semibold text-black font-[Playfair]">
                Expense Chart
              </h3>
              <div className="grid grid-cols-2 gap-4 font-[Roboto]">
                {pieChartData.labels.map((label, index) => (
                  <div key={index} className="flex items-center">
                    <span
                      className="w-6 h-6"
                      style={{
                        backgroundColor:
                          pieChartData.datasets[0].backgroundColor[index],
                      }}
                    ></span>
                    <span className="ml-2 text-black">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Expense Comparison Section */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold mb-4 font-[Playfair]">
            Monthly Comparison
          </h2>
          <div className="h-64 mb-0">
            <Line data={chartData} options={options} />
          </div>
          <div>
            {last3Months.map((monthData) => (
              <div
                key={monthData.month}
                className="flex items-center justify-between p-4 bg-gray-50 rounded shadow-sm"
              >
                <img
                  src={monthIcons[monthData.month as keyof typeof monthIcons]}
                  alt={monthData.month}
                  className="w-8 h-8"
                />
                <span className="text-lg font-semibold font-[Roboto]">
                  {monthData.month}
                </span>
                <span className="text-lg font-[Roboto]">
                  ${monthData.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expense Categories with History */}
      <div className="bg-white shadow mt-6 p-6 rounded">
        <h2 className="text-2xl font-semibold mb-4 font-[Playfair]">
          Expense Categories
        </h2>
        <ul className="space-y-4 font-[Roboto]">
          {Object.keys(categoryTotals).map((category) => {
            let categoryIcon;
            switch (category) {
              case "Transportation":
                categoryIcon = transportationIcon;
                break;
              case "Home":
                categoryIcon = homeInsuranceIcon;
                break;
              case "Utilities":
                categoryIcon = utilitiesIcon;
                break;
              case "Rent":
                categoryIcon = rentExpense;
                break;
              case "Groceries":
                categoryIcon = groceryExpense;
                break;
              case "Entertainment":
                categoryIcon = entertainExpense;
                break;
              default:
                categoryIcon = null;
            }

            return (
              <li key={category} className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="grid grid-cols-3 items-center">
                  <div className="flex items-center">
                    {categoryIcon && (
                      <img
                        src={categoryIcon}
                        alt={`${category} Icon`}
                        className="w-6 h-6 mr-10"
                      />
                    )}
                    <span className="text-lg font-semibold">{category}</span>
                  </div>
                  <span className="text-lg text-center">
                    ${categoryTotals[category]}
                  </span>
                  <button
                    className="text-white px-2 py-1 rounded justify-self-end"
                    onClick={() =>
                      setShowHistory(showHistory === category ? null : category)
                    }
                  >
                    <img
                      src={historyIcon}
                      alt="History Icon"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                {showHistory === category && (
                  <ul className="mt-4 space-y-2 list-disc list-inside">
                    {expenses.history
                      .filter((expense) => expense.category === category)
                      .map((expense) => (
                        <li
                          key={expense.id}
                          className="flex justify-between items-center"
                        >
                          <span className="flex-1">
                            <img
                              src={pointIcon}
                              alt="Point Icon"
                              className="w-4 h-4 inline mr-2"
                            />
                            {expense.date} - {expense.description}
                          </span>
                          <span className="text-center w-24 mr-10">
                            ${expense.amount}
                          </span>
                          <button
                            onClick={() => handleRemoveExpense(expense.id)}
                            className="text-white px-2 py-1 rounded"
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete Icon"
                              className="w-5 h-5"
                            />
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Expense History Section */}
      <div className="bg-white shadow mt-6 p-6 rounded">
        <h2 className="text-2xl font-semibold mb-4 font-[Playfair]">
          Expense History
        </h2>
        <ul className="space-y-2 font-[Roboto]">
          {expenses.history
            .slice(0, showAllHistory ? expenses.history.length : 5)
            .map((expense) => (
              <li key={expense.id} className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="flex justify-between">
                  <span>
                    {expense.date} - {expense.description}
                  </span>
                  <span>${expense.amount}</span>
                </div>
                <button
                  onClick={() => handleRemoveExpense(expense.id)}
                  className="text-white px-3 py-1 rounded mt-2"
                >
                  <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5" />
                </button>
              </li>
            ))}
        </ul>
        {!showAllHistory && expenses.history.length > 5 && (
          <button
            onClick={() => setShowAllHistory(true)}
            className="mt-4 text-black px-4 py-2 rounded flex items-center"
          >
            <img
              src={showAllIcon}
              alt="Show All Icon"
              className="w-5 h-5 mr-2"
            />
            Show All
          </button>
        )}
        {showAllHistory && (
          <button
            onClick={() => setShowAllHistory(false)}
            className="mt-4 text-black px-4 py-2 rounded flex items-center"
          >
            <img
              src={collapseIcon}
              alt="Collapse Icon"
              className="w-5 h-5 mr-2"
            />
            Collapse
          </button>
        )}
        <button
          onClick={handleAddExpense}
          className="mt-4 text-black px-4 py-2 rounded flex items-center"
        >
          <img src={addIcon} alt="Add Icon" className="w-5 h-5 mr-2" />
          Add Expense
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-50 mt-6 p-6 rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2 font-[Playfair]">
            Add New Expense
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Date</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Payment Method
            </label>
            <input
              type="text"
              value={newExpense.paymentMethod}
              onChange={(e) =>
                setNewExpense({ ...newExpense, paymentMethod: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Category</label>
            <select
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              className="border p-2 w-full rounded"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Amount</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
                  amount: parseFloat(e.target.value),
                })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ExpenseManagement;
