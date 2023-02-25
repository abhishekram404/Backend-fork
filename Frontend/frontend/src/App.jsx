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
import Update from "./Cruds/Update";
import Detail from "./Pages/Detail";
import NotFound from "./Pages/NotFound";
import RequireAuth from "./AurthPages/RequireAurth";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="App main-wrapper bg-[#f1f2f6] dark:bg-[#0f172A]">
      <Header />
      <ToastContainer autoClose={2000} position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path="/create/post" element={<Create />} />
          <Route path="/update/post" element={<Update />} />
          <Route path="/postDetail/" element={<Detail />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
        <Route
          path="/user/login"
          element={user === null ? <LoginForm /> : <Home />}
        />
        <Route path="/user/signUp" element={<SignupForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
