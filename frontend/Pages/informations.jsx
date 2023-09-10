import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Slices/authSlice";
import { useGetProfileQuery } from "../Slices/usersApiSlice";
import { useLogoutMutation } from "../Slices/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
const Informations = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProfileQuery();
  const [oussema, setOussema] = useState("");
  const [logoutalouet, { isLoading: isLoggingOut }] = useLogoutMutation();
  useEffect(() => {
    if (data) {
      setOussema(data.Username);
    }
  }, [data]);
  const handleLogout = async () => {
    try {
      await logoutalouet();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      // Handle any errors that occur during logout
    }
  };
  return (
    <>
      <h1> WELCOME {oussema} </h1>
      <button onClick={handleLogout}>click</button>
    </>
  );
};
export default Informations;
