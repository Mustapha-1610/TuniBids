import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import AdminDashboardPage from "../Pages/AdminDashboardPage";
import { useSelector } from "react-redux";
const AdminPrivateRoute = () => {
  const { adminInfo } = useSelector((state) => state.adminData);
  return adminInfo ? <Outlet /> : <Navigate to={"/admin/login"} />;
};

export default AdminPrivateRoute;
