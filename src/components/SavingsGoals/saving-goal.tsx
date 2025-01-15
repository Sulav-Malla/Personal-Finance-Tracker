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
} from "../../slices/savings-slice";
import targetDateIcon from "../../assets/target-date-icon.svg";
import timeLeftIcon from "../../assets/time-left-icon.svg";
import currentAmountIcon from "../../assets/current-amount-icon.svg";
import targetAmountIcon from "../../assets/target-amount-icon.svg";
import goalNameIcon from "../../assets/goal-name-icon.svg";
import remainingFundsIcon from "../../assets/remaining-funds-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";

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
    if (remainingFunds === null || remainingFunds === undefined) {
      dispatch(setRemainingFunds(totalIncome - totalExpense));
    }
  }, [totalIncome, totalExpense, remainingFunds, dispatch]);

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

  const handleRemoveSavingsGoal = (id: string) => {
    dispatch(removeSavingsGoal(id));
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

  const calculateProgress = (goal: ISavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const calculateTimeLeft = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const timeDiff = target.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Target date passed";
  };

  return (
    <div className="p-6 min-h-screen">
      <header className="text-3xl font-bold mb-6 text-gray-800 font-[Merriweather]">
        Savings Goals
      </header>

      <div className="mb-6 p-4 bg-blue-100 rounded-lg flex items-center">
        <img
          src={remainingFundsIcon}
          alt="Remaining Funds Icon"
          className="w-8 h-8 mr-4"
        />
        <h2 className="text-3xl font-semibold text-blue-800 font-[Playfair]">
          Remaining Funds: ${remainingFunds}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savings.savingsGoals.map((goal) => (
          <div key={goal.id} className="bg-white shadow p-4 rounded relative">
            <h2 className="text-xl font-semibold mb-4 flex items-center font-[Playfair]">
              <img
                src={goalNameIcon}
                alt="Goal Name Icon"
                className="w-6 h-6 mr-2"
              />
              {goal.name}
            </h2>
            <p className="text-lg flex items-center font-[Roboto]">
              <img
                src={targetAmountIcon}
                alt="Target Amount Icon"
                className="w-6 h-6 mr-2"
              />
              Target Amount: ${goal.targetAmount}
            </p>
            <p className="text-lg flex items-center font-[Roboto]">
              <img
                src={currentAmountIcon}
                alt="Current Amount Icon"
                className="w-6 h-6 mr-2"
              />
              Current Amount: ${goal.currentAmount}
            </p>
            <p className="text-lg flex items-center font-[Roboto]">
              <img
                src={targetDateIcon}
                alt="Target Date Icon"
                className="w-6 h-6 mr-2"
              />
              Target Date: {goal.targetDate}
            </p>
            <p className="text-lg flex items-center font-[Roboto]">
              <img
                src={timeLeftIcon}
                alt="Time Left Icon"
                className="w-6 h-6 mr-2"
              />
              {calculateTimeLeft(goal.targetDate)}
            </p>
            <div className="my-4">
              <div className="bg-gray-200 h-2 rounded">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${calculateProgress(goal)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 font-[Roboto]">
                {Math.round(calculateProgress(goal))}% to goal
              </p>
            </div>
            <p className="text-lg font-[Roboto]">
              Monthly Contribution: $
              {goal.currentAmount /
                (new Date(goal.targetDate).getMonth() - new Date().getMonth())}
            </p>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => handleEditSavingsGoal(goal)}
                className="text-white px-3 py-1 rounded"
              >
                <img src={editIcon} alt="Edit Icon" className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleRemoveSavingsGoal(goal.id)}
                className="text-white px-3 py-1 rounded"
              >
                <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5" />
              </button>
            </div>
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
                className="text-white bg-green-500 px-3 py-1 rounded"
                disabled={(contributionAmounts[goal.id] || 0) > remainingFunds}
              >
                Add Amount
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddSavingsGoal}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Savings Goal
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-50 mt-6 p-6 rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2 font-[Playfair]">
            {editGoalId ? "Edit Savings Goal" : "Add New Savings Goal"}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-semibold flex items-center">
              <img
                src={goalNameIcon}
                alt="Goal Name Icon"
                className="w-6 h-6 mr-2"
              />
              Goal Name
            </label>
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold flex items-center">
              <img
                src={targetAmountIcon}
                alt="Target Amount Icon"
                className="w-6 h-6 mr-2"
              />
              Target Amount
            </label>
            <input
              type="number"
              value={newGoal.targetAmount}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  targetAmount: parseFloat(e.target.value),
                })
              }
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold flex items-center">
              <img
                src={currentAmountIcon}
                alt="Current Amount Icon"
                className="w-6 h-6 mr-2"
              />
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
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold flex items-center">
              <img
                src={targetDateIcon}
                alt="Target Date Icon"
                className="w-6 h-6 mr-2"
              />
              Target Date
            </label>
            <input
              type="date"
              value={newGoal.targetDate}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetDate: e.target.value })
              }
              className="border p-2 w-full rounded font-[Roboto]"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editGoalId ? "Update" : "Add"}
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

export default SavingsManagement;
