import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../Slices/usersApiSlice";
import { setCredentials } from "../Slices/authSlice";
const LoginForm = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/cardinfo");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ Email, Password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/cardinfo");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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

export default LoginForm;
