import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addIncomeSource, removeIncomeSource } from "../../slices/income-slice";

function IncomeManagement() {
  const dispatch = useDispatch();
  const income = useSelector((state: RootState) => state.income);

  const [showForm, setShowForm] = useState(false);
  const [newSource, setNewSource] = useState({
    type: "",
    amount: 0,
    recurring: false,
  });

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
    setNewSource({ type: "", amount: 0, recurring: false });
    setShowForm(false);
  };

  const handleRemoveIncomeSource = (id: string) => {
    dispatch(removeIncomeSource(id));
  };

  return (
    <div className="p-4">
      <header className="text-4xl font-bold mb-4">Income Management</header>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Total Income</h2>
        <p className="text-xl">${income.totalIncome}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Monthly Comparison</h2>
        <ul>
          {income.monthlyComparison.map((month) => (
            <li key={month.month} className="text-lg">
              {month.month}: ${month.amount}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Income Sources</h2>
        <ul>
          {income.incomeSources.map((source) => (
            <li
              key={source.id}
              className="text-lg flex justify-between items-center"
            >
              <span>
                {source.type}: ${source.amount} (
                {source.recurring ? "Recurring" : "One-time"})
              </span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveIncomeSource(source.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddIncomeSource}
        >
          Add Income Source
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-4 p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Add New Income Source</h3>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Source Name</label>
            <input
              type="text"
              value={newSource.type}
              onChange={(e) =>
                setNewSource({ ...newSource, type: e.target.value })
              }
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Amount</label>
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
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Recurring</label>
            <input
              type="checkbox"
              checked={newSource.recurring}
              onChange={(e) =>
                setNewSource({ ...newSource, recurring: e.target.checked })
              }
              className="mr-2"
            />
            Recurring Income
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Source
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mb-4">
        <h2 className="text-2xl font-bold">Income History</h2>
        <ul>
          {income.incomeHistory.map((history) => (
            <li key={history.id} className="text-lg">
              {history.date} - {history.source}: ${history.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IncomeManagement;
