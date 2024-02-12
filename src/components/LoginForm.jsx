import React, { useEffect, useState } from "react";
import apiUrl from "../url";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        dispatch(login({ userData: data.user, token: data.JWToken }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ userData: data.user, token: data.JWToken })
        );
        navigate("/Allnotes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const { userData, token } = JSON.parse(data);
      dispatch(login({ userData, token }));
      navigate("/Allnotes");
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-2">
      <form
        onSubmit={handeSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-6  mt-4 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
