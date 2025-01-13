import { Link, Outlet } from "react-router-dom";
import dashboardIcon from "../../assets/dashboard.svg";
import incomeIcon from "../../assets/dollar-sign.svg";
import expenseIcon from "../../assets/expense.svg";
import savingIcon from "../../assets/saving-goal.svg";

export function NavLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Side nav */}
      <div
        className="bg-gray-800 text-white w-48 h-screen fixed flex flex-col items-center"
        style={{ top: 0 }}
      >
        <nav className="py-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-yellow-500 transition duration-300"
              >
                <img
                  src={dashboardIcon}
                  alt="Dashboard Icon"
                  className="mr-2 w-5 h-5"
                />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/manage-income"
                className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-yellow-500 transition duration-300"
              >
                <img
                  src={incomeIcon}
                  alt="Income Icon"
                  className="mr-2 w-5 h-5"
                />
                Income
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-yellow-500 transition duration-300"
              >
                <img
                  src={expenseIcon}
                  alt="Expense Icon"
                  className="mr-2 w-5 h-5"
                />
                Expenses
              </Link>
            </li>
            <li>
              <Link
                to="/savings-goal"
                className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-yellow-500 transition duration-300"
              >
                <img
                  src={savingIcon}
                  alt="Saving Goals Icon"
                  className="mr-2 w-5 h-5"
                />
                Saving Goals
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-0 ml-48">
        <Outlet />
      </main>
    </div>
  );
}
