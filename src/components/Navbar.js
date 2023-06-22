import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const {
    getUser,
    theUser,
    setTheUser,
    loggedIn,
    setLoggedIn,
    userBills,
    setUserBills,
  } = useGlobalContext();

  let nav = useNavigate();
  return (
    <div className="firstCont">
      <div className="navCont">
        <div className="leftPannel">
          <div
            onClick={() => {
              nav("/home");
            }}
          >
            Home
          </div>
        </div>
        <div className="rightPannel">
          <div
            onClick={() => {
              nav(`/${theUser.username === "" ? "register" : "home"}`);
            }}
          >
            {theUser.username === ""
              ? "Register"
              : `Welcome, ${theUser.username}`}
          </div>
          {theUser.username === "" ? (
            <div
              onClick={() => {
                nav("/login");
              }}
            >
              Sign in
            </div>
          ) : (
            <div
              onClick={() => {
                localStorage.removeItem("user");
                setTimeout(() => {
                  window.location.href = "/home";
                }, 200);
              }}
            >
              Sign out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
