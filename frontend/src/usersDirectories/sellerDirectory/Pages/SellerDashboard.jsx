import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUpdatedProfileQuery } from "../../../../Slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setSellerCredentials } from "../../../../Slices/authSlice";
const SellerDashboard = () => {
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  const { data: sellerData, isLoading, isError } = useGetUpdatedProfileQuery();
  const [Listings, setListings] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [finichedAuctions, setFinichedAuctions] = useState(null);
  const [onGoingAuctions, setOngoingAuctions] = useState([]);
  const [disputedOrders, setDisputedOrders] = useState(null);
  const [pendingOrders, setPendingOrders] = useState(null);
  const [shippedOrders, setShippedOrders] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sellerInfo) {
      setEarnings(sellerInfo.Earnings);
      setFinichedAuctions(sellerInfo.Listings.Finiched.length);
      setOngoingAuctions(sellerInfo.Listings.Ongoing.length);
      setDisputedOrders(sellerInfo.Orders.Disputed.length);
      setPendingOrders(sellerInfo.Orders.Pending.length),
        setShippedOrders(sellerInfo.Orders.Shipped.length);
    }
  }, [sellerInfo]);
  useEffect(() => {
    if (!isLoading && !isError && sellerData) {
      console.log(sellerData.seller);
      dispatch(setSellerCredentials(sellerData.seller));
    }
  }, [useGetUpdatedProfileQuery, sellerData]);
  return (
    <>
      <h1>SellerDashboard</h1>
      <h1>Earnings : {earnings} $</h1>
      <h1>Finiched Auctions : {finichedAuctions}</h1>
      <h1>Ongoing Auctions : {onGoingAuctions}</h1>
      <h1>Orders</h1>
      <h3>Disputed : {disputedOrders}</h3>
      <h3>Pending : {pendingOrders}</h3>
      <h3>Shipped : {shippedOrders}</h3>
    </>
  );
};

export default SellerDashboard;
