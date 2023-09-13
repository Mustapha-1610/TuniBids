import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSellersignupMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
const SellerSignup = () => {
  const [sellerSignup, { isLoading }] = useSellersignupMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    BusinessName: "",
    Email: "",
    Password: "",
    State: "",
    City: "",
    FullLocation: "",
    PhoneNumber: "",
  });
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sellerSignup(form);
      console.log(res?.data?.Message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        BusinessName :{" "}
        <input
          type="text"
          name="BusinessName"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        Email :
        <input
          type="email"
          name="Email"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        Password :{" "}
        <input
          type="password"
          name="Password"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        State :{" "}
        <input type="text" name="State" onChange={(e) => handleFormChange(e)} />
        <br />
        City :{" "}
        <input type="text" name="City" onChange={(e) => handleFormChange(e)} />
        <br />
        FullLocation :{" "}
        <textarea
          type="text"
          name="FullLocation"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        PhoneNumber :{" "}
        <input
          type="number"
          name="PhoneNumber"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
      <h5>
        Allready Have An Account ?{" "}
        <button onClick={() => navigate("/index/seller/login")}>Login</button>
      </h5>
    </>
  );
};
export default SellerSignup;
