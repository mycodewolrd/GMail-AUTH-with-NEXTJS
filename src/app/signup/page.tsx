/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ToastProvider from "@/app/components/ToastProvider";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      if (
        user.email.length > 0 &&
        user.username.length > 0 &&
        user.password.length > 0
      ) {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Sign Up Success", response.data);
        toast.success("Sign Up Successfully!");
        router.push("/login");
      } else {
        alert("Sign Up Failed - Please try again ");
      }
    } catch (error: any) {
      console.log("SignUp Failed", error);
      toast.error("Something wrong, Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <ToastProvider />
      <h1 className="text-center text-4xl font-bold  text-white my-4 py-4 px-20  ">
        {loading ? "Processing..." : "SignUp Page"}
      </h1>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        className="hover:scale-110 outline-none py-3 px-6 rounded-3xl text-black my-3 "
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter Your Username..."
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        className=" hover:scale-110 outline-none py-3 px-6 rounded-3xl text-black my-3 "
        type="email"
        value={user.email}
        placeholder="Enter Your Email..."
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        className=" hover:scale-110 outline-none py-3 px-6 rounded-3xl text-black my-3 "
        type="password"
        placeholder="Enter Your Password..."
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />
      <button
        className="my-4 px-6 py-2 bg-slate-200 text-slate-950 rounded-2xl hover:bg-white hover:text-orange-600 hover:scale-110 font-bold"
        onClick={onSignUp}
      >
        {buttonDisabled ? "FillUp the form" : "Sign Up"}
      </button>
      <Link
        href="/login"
        className="my-5 px-8 py-1 rounded-lg hover:scale-105 hover:bg-orange-500 bg-orange-400  text-black"
      >
        Visit to Login Page
      </Link>
    </div>
  );
}