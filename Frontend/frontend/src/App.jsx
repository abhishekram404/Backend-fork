import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginForm from "./Pages/LoginForm";
import { useUserLoginMutation } from "./Features/Auth/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./Pages/SignupForm";
import { Routes, Route } from "react-router-dom";

function App() {
  const data = useUserLoginMutation();
  console.log(data);

  return (
    <div className="App">
      <ToastContainer autoClose={4000} position="top-right" />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
