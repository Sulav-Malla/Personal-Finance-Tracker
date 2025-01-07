import React from "react";
import { Link, Outlet } from "react-router-dom";
export function NavLayout() {
  return (
    <div>
      {/* tailwind done using copilot */}
      <div className="bg-gray-800 text-white">
        <nav className="container mx-auto py-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-yellow-500 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/manage-income"
                className="hover:text-yellow-500 transition duration-300"
              >
                Income
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                className="hover:text-yellow-500 transition duration-300"
              >
                Expenses
              </Link>
            </li>
            <li>
              <Link
                to="/savings-goal"
                className="hover:text-yellow-500 transition duration-300"
              >
                Saving Goals
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
