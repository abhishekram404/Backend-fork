import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginForm from "./Pages/LoginForm";
import { useUserLoginMutation } from "./Features/Auth/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./Pages/SignupForm";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
// import Create from "./Pages/Create";
import Create from "../src/Cruds/Create";
import Profile from "./Pages/Profile";

function App() {
  const data = useUserLoginMutation();
  console.log(data);

  return (
    <div className="App">
      <Header />
      <ToastContainer autoClose={4000} position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crud/:type" element={<Create />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/user/signUp" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
