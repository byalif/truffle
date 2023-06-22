import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { getTheUser } from "../services/services.js";

const Home = () => {
  const {
    setTheUser,
    theUser,
    loggedIn,
    setLoggedIn,
    userBills,
    setUserBills,
  } = useGlobalContext();

  useEffect(() => {
    getTheUser()
      .then((x) => {
        if (x.email !== "NOT_FOUND") {
          setTheUser(x);
          setLoggedIn(true);
          let userId = x.id;
          let billz = JSON.parse(localStorage.getItem("bills")).filter((y) => {
            return y.userId === userId;
          });

          setUserBills(billz);
        } else {
          setLoggedIn(false);
          setTheUser({ username: "" });
          nav("/login");
        }
      })
      .catch((err) => {});
  }, []);

  let nav = useNavigate();
  return (
    <div className="homeCont">
      <div className="homeDash">
        <div className="dashTop">Dashboard</div>
        <div className="dashBottom">
          {userBills.length > 0 ? (
            <div className="dashInp">
              {userBills.map((x) => {
                return (
                  <div>
                    <div
                      onClick={() => {
                        nav(`/invoice/${x.id}`);
                      }}
                      className="dashRow"
                      key={x.bill}
                    >
                      <div className="name"> {x.hospital}</div>
                      <div
                        className="date"
                        style={{ fontWeight: "200", fontSize: "16px" }}
                      >
                        {" "}
                        {x.DOS}
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ marginBottom: "90px" }}>Add some bills!</div>
          )}
          <button
            onClick={() => {
              nav("/addBill");
            }}
            className="addBill"
          >
            Add Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
