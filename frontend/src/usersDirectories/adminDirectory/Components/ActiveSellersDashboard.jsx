import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAdminGetActiveSellersMutation } from "../../../../Slices/usersApiSlice";

const ActiveSellersDashboard = () => {
  const [getActiveSellers, { isLoading }] = useAdminGetActiveSellersMutation();
  const [activeSellers, setActiveSellers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getactiveSellers = async () => {
    console.log();
    const res = await getActiveSellers();
    setActiveSellers(res?.data?.sellers);
  };

  useEffect(() => {
    // Call the function manually when the component mounts
    getactiveSellers();
  }, []);

  return (
    <>
      {activeSellers?.length === 0 ? (
        <strong>There Are No Current Active Sellers </strong>
      ) : (
        <>
          {activeSellers?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <img src={item?.BusinessLogo} alt="Loading" />
                <strong> Business Name : </strong>
                {item?.BusinessName}
                <strong>Business Rating : </strong>
                {item?.Rating}
                <strong>Business Publiched Listings </strong>
                <h6>
                  Ogoing : {item?.Listings?.Ongoing?.length} Completed :{" "}
                  {item?.Listings?.Finiched?.length}
                  Pending Approval : {item?.Listings?.PendingApproval?.length}
                </h6>
                <strong>Phone Number : </strong> {item?.PhoneNumber}
                <strong>Business Location : </strong> {item?.State} {item?.City}{" "}
                {item?.FullLocation}
                <button
                  type="button"
                  onClick={() => navigate(`/admin/seller/${item._id}`)}
                >
                  Review Business Profile
                </button>
              </React.Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

export default ActiveSellersDashboard;
