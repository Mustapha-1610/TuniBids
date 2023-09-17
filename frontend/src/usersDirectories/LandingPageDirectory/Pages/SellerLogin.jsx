import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSellerloginMutation } from "../../../../Slices/usersApiSlice";
import { useBidderloginMutation } from "../../../../Slices/usersApiSlice";
import { setSellerCredentials } from "../../../../Slices/authSlice";
const SellerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sellerlogin, { isLoading }] = useSellerloginMutation();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await sellerlogin(form);
      if (res?.data?.Message) {
        setMessage(res?.data?.Message);
      }
      if (res?.data?.SellerAccount) {
        dispatch(setSellerCredentials({ ...res.data.SellerAccount }));
      }
      if (res?.data?.Message) {
        setMessage(res.data.Message);
      }
    } catch (err) {
      console.log(err.data);
    }
  };
  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (sellerInfo) {
    }
  }, [sellerInfo]);
  return (
    <>
      <h2>Seller Login</h2>
      <h4>{message}</h4>
      <form onSubmit={handleFormSubmit}>
        Email :{" "}
        <input
          type="email"
          name="Email"
          onChange={(e) => handleFormChange(e)}
        />
        Password :{" "}
        <input
          type="password"
          name="Password"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <h5>
        Dont Have An Account ?{" "}
        <button
          onClick={() => {
            navigate("/index/seller/signup");
          }}
        >
          SignUp
        </button>
      </h5>
    </>
  );
};
export default SellerLogin;
