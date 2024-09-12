"use client";

import React, { useState } from "react";
import { TUser } from "@/type/user";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const storedUsers: TUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const userExists = storedUsers.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      setError("User with this username already exists");
    } else {
      // Buat user baru dengan todos kosong
      const newUser: TUser = { id: Date.now(), username, password, todos: [] };
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-gray-800 hidden lg:block w-full md:w-1/2 xl:w-1/2 h-screen"></div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-black">
            Create a new account
          </h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full px-4 py-3 rounded-lg  mt-2 border focus:border-grey-800 focus:bg-white focus:outline-none text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg  mt-2 border focus:border-grey-800 focus:bg-white focus:outline-none text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lgmt-2 border focus:border-grey-800 focus:bg-white focus:outline-none text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">{success}</p>
            )}

            <button
              type="submit"
              className="w-full block bg-gray-500 hover:bg-gray-400 focus:bg-gray-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Sign Up
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8 text-black">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
