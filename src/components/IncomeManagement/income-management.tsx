import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addIncomeSource,
  removeIncomeSource,
  addIncomeHistory,
  removeIncomeHistory,
} from "../../slices/income-slice";

import { historyIcon, deleteIcon, addIcon } from "../../assets/featureIcons";
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
import monthIcons from "../../assets/monthIcons";
import {
  firstMedalIcon,
  secondMedalIcon,
  thirdMedalIcon,
  otherMedalIcon,
  confirmIcon,
  cancelIcon,
} from "../../assets/medal-feature-icons";
import {
  pointIcon,
  investSource,
  salarySource,
  freelanceSource,
  generalSource,
} from "../../assets/incomeAssets";
import {
  updateRemainingFunds,
  addToRemainingFunds,
} from "../../slices/savings-slice";

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

function IncomeManagement() {
  const dispatch = useDispatch();
  const income = useSelector((state: RootState) => state.income);

  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState<string | null>(null);
  const [newSource, setNewSource] = useState({
    type: "",
    amount: 0,
    recurring: false,
  });
  const [newIncomeHistory, setNewIncomeHistory] = useState({
    date: "",
    amount: 0,
    type: "",
  });
  const [showAddHistoryForm, setShowAddHistoryForm] = useState<string | null>(
    null
  );

  const handleAddIncomeSource = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncomeSource = {
      id: Date.now().toString(),
      type: newSource.type,
      amount: newSource.amount,
      recurring: newSource.recurring,
    };
    dispatch(addIncomeSource(newIncomeSource));
    dispatch(addToRemainingFunds(newIncomeSource.amount));
    setNewSource({ type: "", amount: 0, recurring: false });
    setShowForm(false);
  };

  const handleRemoveIncomeSource = (id: string) => {
    dispatch(removeIncomeSource(id));
  };

  const handleAddIncomeHistory = (type: string) => {
    const newHistory = {
      id: Date.now().toString(),
      ...newIncomeHistory,
      type,
    };
    dispatch(addIncomeHistory(newHistory));
    dispatch(addToRemainingFunds(newHistory.amount));
    setNewIncomeHistory({
      date: "",
      amount: 0,
      type: "",
    });
    setShowAddHistoryForm(null);
  };

  const handleRemoveIncomeHistory = (id: string, amount: number) => {
    dispatch(removeIncomeHistory(id));
    dispatch(updateRemainingFunds(amount));
  };

  // Pie chart data for Total Income
  const top3Sources = [...income.incomeSources]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const otherSourcesTotal =
    income.totalIncome -
    top3Sources.reduce((acc, source) => acc + source.amount, 0);

  const pieChartData = {
    labels: [...top3Sources.map((source) => source.type), "Other"],
    datasets: [
      {
        data: [
          ...top3Sources.map((source) => source.amount),
          otherSourcesTotal,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
      },
    ],
  };

  const chartData = {
    labels: income.monthlyComparison.map((item) => item.month),
    datasets: [
      {
        label: "Income",
        data: income.monthlyComparison.map((item) => item.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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

  const last3Months = income.monthlyComparison.slice(-3).reverse();

  return (
    <div className="p-6 min-h-screen">
      <header className="text-3xl font-bold mb-6 text-gray-800 font-[Merriweather]">
        Income Management
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <div className="bg-white shadow p-6 rounded col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section: Total Income and Pie Chart */}
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl font-semibold mb-4 text-center font-[Playfair]">
              Total Income
            </h2>
            <p className="text-5xl font-bold mb-6 text-center font-[Merriweather]">
              ${income.totalIncome}
            </p>
            <div className="h-500 mb-4">
              <Pie data={pieChartData} options={pieOptions} height={400} />{" "}
              {/* check later */}
            </div>
          </div>

          {/* Right Section: Income Sources and Pie Chart Legend */}
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl font-semibold mb-4 font-[Playfair]">
              Income Sources
            </h2>
            <div className="space-y-4 font-[Roboto]">
              {top3Sources.map((source, index) => {
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
                } else if (index === 3) {
                  medalIcon = otherMedalIcon;
                  fontWeight = "font-normal";
                }

                return (
                  <div
                    key={source.id}
                    className={`flex items-center space-x-4 mt-4 rounded-lg p-4 ${
                      index < 3 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {medalIcon && (
                      <img
                        src={medalIcon}
                        alt={`${source.type} medal`}
                        className="w-10 h-10"
                      />
                    )}
                    <div className="flex justify-between w-full">
                      <span className={`text-lg text-black ${fontWeight}`}>
                        {source.type}
                      </span>
                      <span className={`text-lg text-black ${fontWeight}`}>
                        ${source.amount || 0}
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
                    ${otherSourcesTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* custom legend */}
            <div className="mt-2">
              <h3 className="text-lg font-semibold text-black font-[Playfair]">
                Income Chart
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

        {/* monthly income compare section */}
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

      {/* current income source section */}
      <div className="bg-white shadow mt-6 p-6 rounded">
        <h2 className="text-2xl font-semibold mb-4 font-[Playfair]">
          Current Sources
        </h2>
        <ul className="space-y-4 font-[Roboto]">
          {income.incomeSources.map((source) => {
            let sourceIcon;
            switch (source.type) {
              case "Freelance":
                sourceIcon = freelanceSource;
                break;
              case "Salary":
                sourceIcon = salarySource;
                break;
              case "Investments":
                sourceIcon = investSource;
                break;
              default:
                sourceIcon = generalSource;
            }

            return (
              <li key={source.id} className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <img
                      src={sourceIcon}
                      alt={`${source.type} Icon`}
                      className="w-6 h-6 mr-10"
                    />
                    {source.type}: ${source.amount} (
                    {source.recurring ? "Recurring" : "One-time"} )
                  </span>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRemoveIncomeSource(source.id)}
                      className="text-white px-3 py-1 rounded mr-2"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete Icon"
                        className="w-5 h-5"
                      />
                    </button>
                    <button
                      className="text-white px-2 py-1 rounded"
                      onClick={() =>
                        setShowHistory(
                          showHistory === source.id ? null : source.id
                        )
                      }
                    >
                      <img
                        src={historyIcon}
                        alt="History Icon"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
                {showHistory === source.id && (
                  <div className="mt-4">
                    <h3 className="text-xl font-bold font-[Playfair]">
                      Income History for {source.type}
                    </h3>
                    <ul>
                      {income.incomeHistory
                        .filter((history) => history.type === source.type)
                        .map((history) => (
                          <li
                            key={history.id}
                            className="text-lg flex justify-between items-center font-[Roboto]"
                          >
                            <span>
                              <img
                                src={pointIcon}
                                alt="Point Icon"
                                className="w-4 h-4 inline mr-6"
                              />
                              {history.date}: ${history.amount}
                            </span>
                            <button
                              className="text-white px-2 py-1 rounded"
                              onClick={() =>
                                handleRemoveIncomeHistory(
                                  history.id,
                                  history.amount
                                )
                              }
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
                    {showAddHistoryForm === source.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddIncomeHistory(source.type);
                        }}
                        className="mt-4"
                      >
                        <h4 className="text-xl font-bold font-[Playfair] mt-4 mb-2">
                          Add Income History
                        </h4>
                        <div className="mb-4">
                          <label className="block text-sm font-semibold">
                            Date
                          </label>
                          <input
                            type="date"
                            value={newIncomeHistory.date}
                            onChange={(e) =>
                              setNewIncomeHistory({
                                ...newIncomeHistory,
                                date: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-semibold">
                            Amount
                          </label>
                          <input
                            type="number"
                            value={newIncomeHistory.amount}
                            onChange={(e) =>
                              setNewIncomeHistory({
                                ...newIncomeHistory,
                                amount: parseFloat(e.target.value),
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>
                        <div className="flex">
                          <button
                            type="submit"
                            className=" text-white mr-2 rounded"
                          >
                            <img src={confirmIcon} className="h-8 w-8" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddHistoryForm(null)}
                            className=" text-white rounded"
                          >
                            <img src={cancelIcon} className="h-8 w-8" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowAddHistoryForm(source.id)}
                        className="mt-4 text-black px-4 py-2 rounded flex items-center"
                      >
                        <img
                          src={addIcon}
                          alt="Add Icon"
                          className="w-5 h-5 mr-2"
                        />
                        Add Income History
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <button
          onClick={handleAddIncomeSource}
          className="mt-4 text-black px-4 py-2 rounded flex items-center"
        >
          <img src={addIcon} alt="Add Icon" className="w-5 h-5 mr-2" />
          Add Source
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-50 mt-6 p-6 rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2 font-[Playfair]">
            Add New Income Source
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Source Name</label>
            <input
              type="text"
              value={newSource.type}
              onChange={(e) =>
                setNewSource({ ...newSource, type: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Amount</label>
            <input
              type="number"
              value={newSource.amount}
              onChange={(e) =>
                setNewSource({
                  ...newSource,
                  amount: parseFloat(e.target.value),
                })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Recurring</label>
            <input
              type="checkbox"
              checked={newSource.recurring}
              onChange={(e) =>
                setNewSource({ ...newSource, recurring: e.target.checked })
              }
              className="mr-2"
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="text-white rounded">
              <img src={confirmIcon} className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-white rounded"
            >
              <img src={cancelIcon} className="h-8 w-8" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default IncomeManagement;
