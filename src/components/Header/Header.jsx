import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.auth.userData && state.auth.userData.token
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logoutHandler = () => {
    toast.success("logged out")
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-600 p-6">
        <div className="flex items-center flex-shrink-0 text-black mr-6 font-mono">
          <Link to="/" className="font-semibold text-xl tracking-tight">
            NoteNova
          </Link>
          <svg
            width="24px"
            className="ml-2"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 5C5.34315 5 4 6.34315 4 8V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V12.5C20 11.9477 20.4477 11.5 21 11.5C21.5523 11.5 22 11.9477 22 12.5V16C22 18.7614 19.7614 21 17 21H7C4.23858 21 2 18.7614 2 16V8C2 5.23858 4.23858 3 7 3H10.5C11.0523 3 11.5 3.44772 11.5 4C11.5 4.55228 11.0523 5 10.5 5H7Z"
              fill="#000000"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.8431 3.58579C18.0621 2.80474 16.7957 2.80474 16.0147 3.58579L11.6806 7.91992L11.0148 11.9455C10.8917 12.6897 11.537 13.3342 12.281 13.21L16.3011 12.5394L20.6347 8.20582C21.4158 7.42477 21.4158 6.15844 20.6347 5.37739L18.8431 3.58579ZM13.1933 11.0302L13.5489 8.87995L17.4289 5L19.2205 6.7916L15.34 10.6721L13.1933 11.0302Z"
              fill="#000000"
            />
          </svg>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-900 font-bold text-lg border-gray-900 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            {/* Mobile menu icon */}
            <svg
              width="24px"
              height="24px"
              className="font-bold"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full ${
            isMenuOpen ? "" : "hidden"
          } lg:block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow lg:text-right">
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold mr-4 border-b border-transparent hover:border-white"
            >
              Home
            </Link>
            {isAuthenticated !== null &&
            isAuthenticated !== undefined &&
            isAuthenticated ? (
              <button
                onClick={logoutHandler}
                className="block mt-4 lg:inline-block lg:mt-0 font-bold  text-white mr-4 border-b border-transparent hover:border-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
              >
                Login
              </Link>
            )}

            {isAuthenticated !== null &&
            isAuthenticated !== undefined &&
            isAuthenticated ? (
              ""
            ) : (
              <Link
                to="/register"
                className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
              >
                Register
              </Link>
            )}
            {isAuthenticated !== null &&
            isAuthenticated !== undefined &&
            isAuthenticated ? (
              <Link
                to="/create-note"
                className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
              >
                Add Note
              </Link>
            ) : (
              ""
            )}
            {isAuthenticated !== null &&
            isAuthenticated !== undefined &&
            isAuthenticated ? (
              <Link
                to="/Allnotes"
                className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
              >
                All Notes
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
