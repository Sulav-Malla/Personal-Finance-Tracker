import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addExpense, removeExpense } from "../../slices/expense-slice";

function ExpenseManagement() {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses);

  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: 0,
    date: "",
    description: "",
  });

  const handleAddExpense = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpenseEntry = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: newExpense.amount,
      date: newExpense.date,
      description: newExpense.description,
    };

    dispatch(addExpense(newExpenseEntry));
    setNewExpense({ category: "", amount: 0, date: "", description: "" });
    setShowForm(false);
  };

  const handleRemoveExpense = (id: string) => {
    dispatch(removeExpense(id));
  };

  return (
    <div className="p-4">
      <header className="text-4xl font-bold mb-4">Expense Management</header>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Total Expenses</h2>
        <p className="text-xl">${expenses.totalExpenses}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <ul>
          {expenses.expenses.map((expense) => (
            <li
              key={expense.id}
              className="text-lg flex justify-between items-center"
            >
              <span>
                {expense.category}: ${expense.amount} ({expense.date}) -{" "}
                {expense.description}
              </span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveExpense(expense.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-4 p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Add New Expense</h3>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Category</label>
            <input
              type="text"
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Amount</label>
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
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Date</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-lg font-semibold">Description</label>
            <textarea
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Expense
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
    </div>
  );
}

export default ExpenseManagement;
