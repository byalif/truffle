import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { getTheUser } from "../services/services.js";
import { useParams } from "react-router-dom";
import { Image, Video, Transformation } from "cloudinary-react";

const Summary = () => {
  let nav = useNavigate();
  let { id } = useParams();
  const {
    setTheUser,
    theUser,
    loggedIn,
    theBill,
    setTheBill,
    setLoggedIn,
    userBills,
    setUserBills,
  } = useGlobalContext();

  useEffect(() => {
    if (id) {
      getTheUser()
        .then((x) => {
          if (x.email !== "NOT_FOUND") {
            setTheUser(x);
            setLoggedIn(true);
            let userId = x.id;
            let billz = JSON.parse(localStorage.getItem("bills"));
            billz.forEach((d) => {
              console.log(id);
              if (d.id == id) {
                console.log(d);
                setTheBill(d);
              }
            });
          } else {
            setLoggedIn(false);
            setTheUser({ username: "" });
            nav("/login");
          }
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <div className="homeCont">
      <div className="homeDash">
        <div className="dashTop">INVOICE</div>
        <div className="dashBottom">
          {theBill.id !== -1 && (
            <div className="invoice">
              <div className="invoiceTop">
                <div>
                  {theBill.first} {theBill.last}
                </div>
                <div>{theBill.street}</div>
                <div>{theBill.zip}</div>
              </div>
              <div className="invoiceMiddle">
                <div className="midLeft">
                  Truffle Health. <hr />
                </div>
                <div className="midRight">
                  <div>Invoice #</div>
                  <div>{theBill.id + 100000}</div>
                  <div>Hospital</div>
                  <div>{theBill.hospital}</div>
                  <div>DOS.</div>
                  <div>
                    {new Date(theBill.DOS).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div>Bill Amount</div>
                  <div>${theBill.bill}</div>
                </div>
              </div>
              <div
                className="invoiceBottom"
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image cloudName="dcchunhwy" publicId={theBill.image}>
                  <Transformation crop="scale" width="200" />
                </Image>
                {/* <img src={theBill.image} alt="" /> */}
              </div>
            </div>
          )}
          <div>
            {" "}
            <button
              onClick={() => {
                nav(`/editBill/${theBill.id}`);
              }}
              className="addBill"
            >
              Edit Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
