import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdmingetbiddersQuery } from "../../../../Slices/usersApiSlice";
const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: usersData, isLoading } = useAdmingetbiddersQuery();
  const [activeBiddersCount, setActiveBiddersCount] = useState("");
  const [activeSellersCount, setActiveSellersCount] = useState("");
  const [sellersAwaitingActivationCount, setSellersAwaitingActivationCount] =
    useState("");
  useEffect(() => {
    try {
      const data = usersData;
      setActiveBiddersCount(data.activeBidders.length);
      setActiveSellersCount(data.activeSellers.length);
      setSellersAwaitingActivationCount(data.sellersAwaitingValidation.length);
    } catch (err) {}
  }, [usersData]);
  return (
    <>
      <h1>Admin Dashboard</h1>
      <h2>Active Bidders : {activeBiddersCount}</h2>
      <h2>Active Sellers : {activeSellersCount}</h2>
      <h2>Sellers Awaiting Validation : {sellersAwaitingActivationCount}</h2>
    </>
  );
};

export default AdminDashboardPage;
