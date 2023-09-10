import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminCredentials } from "../../../../Slices/authSlice";
import { setBidderCredentials } from "../../biddersDirectory/Slices/bidderAuthSlice";
import { useAdminloginMutation } from "../../../../Slices/usersApiSlice";
import { useBidderloginMutation } from "../../../../Slices/usersApiSlice";
const AdminLoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useBidderloginMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ Email, Password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button disabled={isLoading} type="submit">
          Click
        </button>
      </form>
    </>
  );
};

export default AdminLoginPage;
