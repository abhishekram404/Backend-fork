import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import LoginForm from "../Pages/LoginForm";

const RequireAuth = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user);
  return user != null ? <Outlet /> : <Navigate to={<LoginForm />} replace />;
};

export default RequireAuth;
