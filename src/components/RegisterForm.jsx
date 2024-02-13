import React, { useState } from "react";
import apiUrl from '../url.js';
import axios from 'axios'
import {  useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import toast from "react-hot-toast";

const RegisterForm = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
     const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
         e.preventDefault();
         if(!name&&!password&&!email){
           toast.error("Please fill all fields");
           return;
         }
          try {
            const {data}= await axios.post(`${apiUrl}/api/v1/auth/register`,{
                name,
                email,
                password
            })

            if(data.success){
              toast.success("Successfully registered")
                dispatch(login(data.user))
            }
          } catch (error) {
            console.log(error)
            toast.error("Error while registering")
          }
    }
  return (
    <div className="max-w-md mx-auto mt-2">
      <form className="bg-transparent border shadow-md shadow-white rounded px-8 pt-6 pb-8 mb-4 mt-14" onSubmit={handleSubmit}>
        <h1 className="text-center text-gray-300 font-bold text-lg">Register Form</h1>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
