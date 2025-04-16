import React, { useState } from "react";
import { useAuth } from "../context/auth";
import Login from "./Login";
import Signup from "./Signup";

const Account = () => {
  const [auth] = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {!auth?.token ? (
        <>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h2 className="text-2xl font-bold">
              {showLogin ? "Login to your account" : "Create a new account"}
            </h2>

            {showLogin ? (
              <Login />
            ) : (
              <Signup onSubmit={() => setShowLogin(true)} />
            )}

            <p className="mt-4 text-sm">
              {showLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
          <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
            <p className="mb-2">
              <strong>Name:</strong> {auth.user?.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {auth.user?.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {auth.user?.phone || "N/A"}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              window.location.reload(); // or use setAuth({ user: null, token: "" });
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default Account;
