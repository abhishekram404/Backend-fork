import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../Features/Auth/userSlice";

const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("mernTheme") ?? "light"
  );

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("mernTheme", theme);
  }, [theme]);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  return (
    <div>
      <nav className="bg-blue-700 border-gray-200 sm:px-4  rounded dark:bg-gray-900 dark:border-b dark:border-[#4d4c4c] dark:rounded-none">
        <div className="container flex flex-wrap items-center justify-between ml-[80px] ">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Blog
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
              className="flex flex-col justify-end p-1 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
              style={{ marginLeft: "auto" }}
            >
              {user === null ? (
                <div className="flex  space-x-5 flex-wrap m-6">
                  <li>
                    <Link
                      to="/user/login"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent dark:text-white"
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/signUp"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent dark:text-white"
                      aria-current="page"
                    >
                      SignUp
                    </Link>
                  </li>
                  <div className="icons cursor-pointer mt-2 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white">
                    {theme === "dark" ? (
                      <div className="icon" onClick={handleTheme}>
                        <i class="fa-solid fa-sun  dark:text-white"></i>
                      </div>
                    ) : (
                      <div className="icon" onClick={handleTheme}>
                        <i class="fa-solid fa-moon  dark:text-white"></i>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex  space-x-5 flex-wrap m-6">
                  <li>
                    <Link
                      to="/create/post"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    >
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/profile"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        dispatch(clearUser());
                      }}
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    >
                      Logout
                    </button>
                  </li>
                  <div className="icons cursor-pointer text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white">
                    {theme === "dark" ? (
                      <div className="icon" onClick={handleTheme}>
                        <i class="fa-solid fa-sun  dark:text-white"></i>
                      </div>
                    ) : (
                      <div className="icon" onClick={handleTheme}>
                        <i class="fa-solid fa-moon  dark:text-white"></i>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
