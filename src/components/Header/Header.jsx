import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux"
import { logout } from "../../store/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.auth.userData && state.auth.userData.token
  );
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
const logoutHandler=()=>{
    dispatch(logout());
    localStorage.removeItem('auth');
    navigate('/login');
}
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-600 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            My Notes App
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            {/* Mobile menu icon */}
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
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

           {
             isAuthenticated!== null &&
            isAuthenticated!==undefined && isAuthenticated?(""
            ):(
              <Link
              to="/register"
              className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
            >
              Register
            </Link>
            )
           }
            {
               isAuthenticated !== null &&
              isAuthenticated !== undefined && isAuthenticated?(
                <Link
              to="/create-note"
              className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
            >
              Add Note
            </Link>
              ):("")
            }
            {
               isAuthenticated !== null &&
              isAuthenticated !== undefined && isAuthenticated?(
                <Link
              to="/Allnotes"
              className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white mr-4 border-b border-transparent hover:border-white"
            >
              All Notes
            </Link>
              ):("")
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
