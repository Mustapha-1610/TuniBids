import React, { useState, useEffect } from "react";
import { useAdmingetDisabledSellersAccountsMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
const DisabledSellersPage = () => {
  const [getDisabledAccounts, { isLoading }] =
    useAdmingetDisabledSellersAccountsMutation();
  const [disabledSellers, setDisabledSellers] = useState([]);
  const navigate = useNavigate();
  const getsellers = async () => {
    const res = await getDisabledAccounts();
    setDisabledSellers(res?.data?.sellers);
  };
  useEffect(() => {
    getsellers();
  }, []);
  return (
    <>
      {disabledSellers?.length === 0 ? (
        <strong>There Are No Current Disabled Seller Accounts </strong>
      ) : (
        <>
          {disabledSellers?.map((item, index) => {
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

export default DisabledSellersPage;
