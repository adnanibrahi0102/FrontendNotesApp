import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
const HomePage = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.userData && state.auth.userData.token
  );
  const userData=useSelector((state)=>state.auth.userData&&state.auth.userData)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const { userData, token } = JSON.parse(data);
      dispatch(login({ userData, token }));
      
    }
  }, [])
   return isAuthenticated?(
    <div className="text-center text-white mt-14">
    <p className="text-2xl font-semibold">Welcome back, {userData.userData.name}!</p>
    <p className="text-lg mt-4 mb-8">Here are some tips for using NoteNova:</p>
    <ul className="text-left list-disc mx-auto max-w-lg bg-gray-800 p-6 rounded-lg">
      <li className="mb-2 text-gray-300">Tip 1: Use tags to organize your notes more efficiently.</li>
      <li className="mb-2 text-gray-300">Tip 2: Take advantage of the search feature to find specific notes quickly.</li>
      <li className="mb-2 text-gray-300">Tip 3: Explore the rich text editing capabilities with TinyMCE.</li>
      <li className="mb-2 text-gray-300">Tip 4: Utilize folders to categorize your notes for better organization.</li>
    </ul>
  </div>
   ):(
    <div className=" px-4 py-8 flex items-center justify-center flex-col text-gray-300">
      <h1 className="text-3xl font-bold mb-4">Welcome to NoteNova</h1>
      <p className="text-lg mb-4">
        Your ultimate tool for organizing your thoughts, ideas, and tasks.
      </p>
      <p className="text-lg mb-4">With NoteNova, you can:</p>
      <ul className="list-disc ml-8 mb-4">
        <li>Take notes and jot down your ideas anytime, anywhere.</li>
        <li>Search for specific notes quickly and easily.</li>
        <li>Access your notes across all your devices.</li>
        <li>And much more!</li>
      </ul>
      <p className="text-lg">Ready to get started?</p>
      <div className="flex mt-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Sign Up
        </button>
        <button className="bg-gray-200 hover:bg-gray-900 text-gray-800 font-bold py-2 px-4 rounded">
          Learn More
        </button>
      </div>
    </div>
   )
};

export default HomePage;
