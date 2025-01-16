import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addSavingsGoal,
  removeSavingsGoal,
  updateSavingsGoal,
  setRemainingFunds,
  updateRemainingFunds,
  editSavingsGoal,
  addToRemainingFunds,
} from "../../slices/savings-slice";

import {
  editIcon,
  deleteIcon,
  targetDateIcon,
  currentAmountIcon,
  remainingFundsIcon,
  goalNameIcon,
  targetAmountIcon,
  timeLeftIcon,
  addAmountIcon,
  doneIcon,
  addGoalIcon,
} from "../../assets/savingAssets";

interface ISavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

function SavingsManagement() {
  const dispatch = useDispatch();

  const savings = useSelector((state: RootState) => state.savings);
  const totalIncome = useSelector(
    (state: RootState) => state.income.totalIncome
  );
  const totalExpense = useSelector(
    (state: RootState) => state.expenses.totalExpense
  );
  const remainingFunds = useSelector(
    (state: RootState) => state.savings.remainingFunds
  );

  useEffect(() => {
    if (!savings.isInitialized) {
      const calculatedFunds = totalIncome - totalExpense;
      dispatch(setRemainingFunds(calculatedFunds));
    }
  }, [savings.isInitialized, totalIncome, totalExpense, dispatch]);

  const [showForm, setShowForm] = useState(false);
  const [editGoalId, setEditGoalId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: "",
  });
  const [contributionAmounts, setContributionAmounts] = useState<{
    [key: string]: number;
  }>({});

  const handleAddSavingsGoal = () => {
    setShowForm(true);
    setEditGoalId(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editGoalId) {
      dispatch(editSavingsGoal({ id: editGoalId, ...newGoal }));
    } else {
      const newSavingsGoal: ISavingsGoal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: newGoal.targetAmount,
        currentAmount: newGoal.currentAmount,
        targetDate: newGoal.targetDate,
      };
      dispatch(addSavingsGoal(newSavingsGoal));
    }
    setNewGoal({ name: "", targetAmount: 0, currentAmount: 0, targetDate: "" });
    setShowForm(false);
  };

  const handleRemoveSavingsGoal = (id: string, amount: number) => {
    dispatch(removeSavingsGoal(id));
    dispatch(addToRemainingFunds(amount));
  };

  const handleUpdateSavingsGoal = (id: string, amount: number) => {
    const goal = savings.savingsGoals.find((g) => g.id === id);
    if (
      goal &&
      goal.currentAmount + amount <= goal.targetAmount &&
      amount <= remainingFunds
    ) {
      dispatch(updateSavingsGoal({ id, amount }));
      dispatch(updateRemainingFunds(amount));
      setContributionAmounts({ ...contributionAmounts, [id]: 0 });
    }
  };

  const handleEditSavingsGoal = (goal: ISavingsGoal) => {
    setNewGoal({
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      targetDate: goal.targetDate,
    });
    setEditGoalId(goal.id);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setNewGoal({ name: "", targetAmount: 0, currentAmount: 0, targetDate: "" });
    setShowForm(false);
    setEditGoalId(null);
  };

  const calculateProgress = (goal: ISavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };
  const isFormValid =
    newGoal.name.trim() !== "" &&
    newGoal.targetAmount > 0 &&
    newGoal.currentAmount >= 0 &&
    newGoal.targetDate !== "";

  const calculateTimeLeft = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const timeDiff = target.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Target date passed";
  };

  const calculateMonthlyContribution = (goal: ISavingsGoal) => {
    const monthsLeft =
      new Date(goal.targetDate).getMonth() - new Date().getMonth();
    return monthsLeft > 0
      ? (goal.currentAmount / monthsLeft).toFixed(2)
      : "0.00";
  };

  const getProgressColor = (progress: number) => {
    if (progress <= 30) {
      return "bg-red-500";
    } else if (progress > 30 && progress <= 70) {
      return "bg-yellow-500";
    }
    return "bg-green-500";
  };
  const getCompletionStatus = (progress: number) => {
    if (progress === 100) {
      return true;
    }
    return false;
  };

  const totalCollectedFunds = savings.savingsGoals.reduce(
    (total, goal) => total + goal.currentAmount,
    0
  );

  return (
    <div className="p-6 min-h-screen">
      <header className="text-3xl font-bold mb-6 text-gray-800 font-[Merriweather]">
        Savings Goals
      </header>

      <div className="mb-4 p-4 bg-blue-100 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={remainingFundsIcon}
            alt="Remaining Funds Icon"
            className="w-8 h-8 mr-4"
          />
          <h2 className="text-3xl font-semibold text-blue-800 font-[Playfair]">
            Remaining Funds: ${remainingFunds !== null ? remainingFunds : 0}
          </h2>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-black-800 font-[Playfair] ml-4">
            Funds Allocated: ${totalCollectedFunds}
          </h2>
        </div>
      </div>
      <button
        onClick={handleAddSavingsGoal}
        className="bg-green-400 text-white px-4 py-2 rounded mb-2 flex items-center"
      >
        <img src={addGoalIcon} className="h-10, w-10 mr-2" />
        <span className="text-xl font-[Playfair] text-black font-bold">
          Add Goal
        </span>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savings.savingsGoals.map((goal) => (
          <div key={goal.id} className="bg-white shadow p-4 rounded relative">
            <h2 className="text-xl font-semibold mb-4 flex items-center font-[Playfair]">
              <img
                src={goalNameIcon}
                alt="Goal Name Icon"
                className="w-6 h-6 mr-4"
              />
              {goal.name}
            </h2>
            <div>
              {" "}
              {/* come back change color */}
              <p className="text-lg flex items-center font-[Roboto]">
                <img
                  src={targetAmountIcon}
                  alt="Target Amount Icon"
                  className="w-6 h-6 mr-4"
                />
                Target Amount: ${goal.targetAmount}
              </p>
              <p className="text-lg flex items-center font-[Roboto]">
                <img
                  src={currentAmountIcon}
                  alt="Current Amount Icon"
                  className="w-6 h-6 mr-4"
                />
                Current Amount: ${goal.currentAmount}
              </p>
              <p className="text-lg flex items-center font-[Roboto]">
                <img
                  src={targetDateIcon}
                  alt="Target Date Icon"
                  className="w-6 h-6 mr-4"
                />
                Target Date: {goal.targetDate}
              </p>
            </div>
            <p className="text-lg flex items-center font-[Roboto] mt-4">
              <img
                src={timeLeftIcon}
                alt="Time Left Icon"
                className="w-6 h-6 mr-4"
              />
              {calculateTimeLeft(goal.targetDate)}
            </p>
            <div className="my-4">
              <div className="bg-gray-200 h-2 rounded">
                <div
                  className={`${getProgressColor(
                    calculateProgress(goal)
                  )} h-2 rounded`}
                  style={{ width: `${calculateProgress(goal)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 font-[Roboto]">
                {Math.round(calculateProgress(goal))}% to goal
              </p>
            </div>
            <p className="text-lg font-[Roboto]">
              Monthly Contribution: ${calculateMonthlyContribution(goal)}
            </p>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => handleEditSavingsGoal(goal)}
                className="text-white px-3 py-1 rounded"
              >
                <img src={editIcon} alt="Edit Icon" className="w-5 h-5" />
              </button>
              {getCompletionStatus(calculateProgress(goal)) ? (
                <button
                  onClick={() => handleRemoveSavingsGoal(goal.id, 0)}
                  className="text-white px-3 py-1 rounded"
                >
                  <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleRemoveSavingsGoal(goal.id, goal.currentAmount)
                  }
                  className="text-white px-3 py-1 rounded"
                >
                  <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5" />
                </button>
              )}
            </div>
            {getCompletionStatus(calculateProgress(goal)) ? (
              <img
                src={doneIcon}
                alt="Add Amount"
                className="h-20 w-20 mx-auto"
              />
            ) : (
              <div className="mt-4">
                <input
                  type="number"
                  value={contributionAmounts[goal.id] || ""}
                  onChange={(e) =>
                    setContributionAmounts({
                      ...contributionAmounts,
                      [goal.id]: parseFloat(e.target.value),
                    })
                  }
                  className="border p-2 w-full rounded mb-2 font-[Roboto]"
                  placeholder="Enter amount to add"
                />

                <button
                  onClick={() =>
                    handleUpdateSavingsGoal(
                      goal.id,
                      contributionAmounts[goal.id] || 0
                    )
                  }
                  className={`text-black bg-green-400 px-3 py-1 rounded flex ${
                    (contributionAmounts[goal.id] || 0) > remainingFunds ||
                    (contributionAmounts[goal.id] || 0) >
                      goal.targetAmount - goal.currentAmount
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    (contributionAmounts[goal.id] || 0) > remainingFunds ||
                    (contributionAmounts[goal.id] || 0) >
                      goal.targetAmount - goal.currentAmount
                  }
                >
                  <img
                    src={addAmountIcon}
                    alt="Add Amount"
                    className="h-5 w-5 mr-2"
                  />

                  <span>Add</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Check if it's Add Goal and if form is valid
            if (editGoalId || isFormValid) {
              handleFormSubmit(e); // Only submit if valid or in "edit" mode
            }
          }}
          className="bg-gray-50 mt-6 p-6 rounded shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 font-[Playfair]">
            {editGoalId ? "Edit" : "Add"} Savings Goal
          </h3>

          <div className="mb-4">
            <label className="block text-lg font-[Roboto]">Goal Name</label>
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              required
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-[Roboto]">Target Amount</label>
            <input
              type="number"
              value={newGoal.targetAmount}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  targetAmount: parseFloat(e.target.value),
                })
              }
              required
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-[Roboto]">
              Current Amount
            </label>
            <input
              type="number"
              value={newGoal.currentAmount}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  currentAmount: parseFloat(e.target.value),
                })
              }
              required
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-[Roboto]">Target Date</label>
            <input
              type="date"
              value={newGoal.targetDate}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetDate: e.target.value })
              }
              required
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                !isFormValid && !editGoalId
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={!isFormValid && !editGoalId} // Disable if invalid
            >
              {editGoalId ? "Save Changes" : "Add Goal"}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
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

export default SavingsManagement;
