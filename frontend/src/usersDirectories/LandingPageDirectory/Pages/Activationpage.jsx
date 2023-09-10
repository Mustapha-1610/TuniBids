import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBidderActivationMutation } from "../../../../Slices/usersApiSlice";
const ActivationPage = () => {
  let params = useParams();
  const [activate, { isLoading }] = useBidderActivationMutation();
  const [res, setRes] = useState("");
  const BidderId = params.BidderId;
  const ActivationCode = params.ActivationCode;
  const navigate = useNavigate();
  const activateBidder = async () => {
    setRes(await activate({ BidderId, ActivationCode }));
  };
  useEffect(() => {
    try {
      if (res?.data?.Activated === true) {
        navigate("/index/email/Confirmation");
      } else if (!res?.data?.Activated === false) {
        navigate("/index/login");
      }
      activateBidder();
    } catch (err) {}
  }, [res]);
  return (
    <>
      <h1>Activation Page</h1>
      <h1>{params.BidderId}</h1>
      <h1>{params.ActivationCode}</h1>
    </>
  );
};

export default ActivationPage;
