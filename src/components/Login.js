import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/services.js";
import { useGlobalContext } from "../context";

const Login = () => {
  const {
    getUser,
    theUser,
    setTheUser,
    loggedIn,
    setLoggedIn,
    userBills,
    setUserBills,
  } = useGlobalContext();

  const nav = useNavigate();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const success = useRef();

  const login = () => {
    signin(user)
      .then((prom) => {
        if (prom.status == "VALID") {
          setTimeout(() => {
            //Set global user to this user
            setTheUser(prom);

            success.current.style.backgroundColor = "#59b384";
            success.current.innerHTML = `<p>Logging in.. <b>${user.email}</b></p>`;
            success.current.style.display = "flex";
            setTimeout(() => {
              nav("/home");
            }, 300);
          }, 200);
        } else if (prom.status == "ERROR") {
          setTimeout(() => {
            success.current.style.backgroundColor = "#d68383";
            success.current.style.color = "#170f0f";
            success.current.innerHTML = `<p>Oops something went wrong. <b>Try again</b></p>`;
            success.current.style.display = "flex";
          });
        } else if (prom.status == "WRONG") {
          setTimeout(() => {
            success.current.style.backgroundColor = "#d68383";
            success.current.style.color = "#170f0f";
            success.current.innerHTML = `<p>Incorrect credentials. <b>Try again</b></p>`;
            success.current.style.display = "flex";
          });
        } else if (prom.status == "NULL") {
          setTimeout(() => {
            success.current.style.backgroundColor = "#d68383";
            success.current.style.color = "#170f0f";
            success.current.innerHTML = `<p>This user doesn't exist in our system.</p>`;
            success.current.style.display = "flex";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cont">
      <div className="form">
        <div className="top">
          <h1>Sign in</h1>
        </div>
        <hr />
        <p
          ref={success}
          className="regErr"
          style={{
            backgroundColor: "#82bd85",
            borderRadius: "4px",
            color: "#00470b",
            textAlign: "center",
            fontWeight: "400",
            paddingTop: "8px",
            margin: "0",
          }}
          name="username"
        />
        <div className="bottom">
          <p>Email</p>
          <input name="username" onChange={changeValue} type="text" />
          <p>Password</p>
          <input name="password" onChange={changeValue} type="password" />
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
