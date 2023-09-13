import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminCredentials } from "../../../../Slices/authSlice";
import { setBidderCredentials } from "../../biddersDirectory/Slices/bidderAuthSlice";
import { useAdminloginMutation } from "../../../../Slices/usersApiSlice";
import io from "socket.io-client";
const AdminLoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Key, setKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useAdminloginMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const res = await login({ Email, Key }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
    } catch (err) {
      console.log(err);
    }
  };
  const { adminInfo } = useSelector((state) => state?.adminData);
  useEffect(() => {
    if (adminInfo) {
      navigate("/admin/");
      const socket = io("http://localhost:5000/admin");
      socket.on("event", (msg) => {
        console.log(msg);
      });
    }
  }, [adminInfo]);
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
          value={Key}
          onChange={(e) => {
            setKey(e.target.value);
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
