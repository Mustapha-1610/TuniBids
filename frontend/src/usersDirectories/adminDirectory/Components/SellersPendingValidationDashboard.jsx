import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminGetSellersPendingValidationMutation } from "../../../../Slices/usersApiSlice";
const SellersPendingValidationDashboard = () => {
  const navigate = useNavigate();
  const [getSellersPendingValidation, { isLoading }] =
    useAdminGetSellersPendingValidationMutation();
  const [selersPendingValidation, setSellersPendingValidation] = useState([]);
  const getsellers = async () => {
    const res = await getSellersPendingValidation();
    setSellersPendingValidation(res?.data?.PendingSellers);
  };
  useEffect(() => {
    getsellers();
  }, []);
  return (
    <>
      {selersPendingValidation?.length === 0 ? (
        <strong>
          There Are No Current Sellers Which Are Pending Validation
        </strong>
      ) : (
        <>
          {selersPendingValidation?.map((item, index) => {
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
      ;
    </>
  );
};

export default SellersPendingValidationDashboard;
