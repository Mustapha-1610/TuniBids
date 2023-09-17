import React, { useEffect, useState } from "react";
import { useBidderloginMutation } from "../../../../Slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSendBidderActivationMailMutation } from "../../../../Slices/usersApiSlice";
import { setBidderCredentials } from "../../../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [login, { isLoading }] = useBidderloginMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const [sendMail] = useSendBidderActivationMailMutation();
  const navigate = useNavigate();

  const handleMailRequest = async (e, Name, Email, _id, ActivationCode) => {
    const res = await sendMail({ Name, Email, _id, ActivationCode });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ Email, Password }).unwrap();
      dispatch(setBidderCredentials({ ...res }));
    } catch (err) {
      console.log(err);
      setErrorMessage(
        <>
          {err.data.Message}
          <button
            onClick={() => (
              handleMailRequest(
                e,
                err.data.Name,
                err.data.Email,
                err.data._id,
                err.data.ActivationCode
              ),
              setErrorMessage("Email Sent Check Your Inbox")
            )}
          >
            Send Mail
          </button>
        </>
      );
    }
  };

  return (
    <>
      <h1>Login</h1>
      <h3>{errorMessage ? <>{errorMessage}</> : null}</h3>
      <form onSubmit={submitHandler}>
        Email :
        <input
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        Password :
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <h5>
        Dont Have An Account ?{" "}
        <button onClick={() => navigate("/index/signup")}>SignUp</button>
      </h5>
    </>
  );
};

export default LoginPage;
