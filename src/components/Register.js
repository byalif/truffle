import React, { useEffect, useState, useRef } from "react";
import Check from "../FormValidations/Register.js";
import { register } from "../services/services.js";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Register = () => {
  const nav = useNavigate();
  const {
    getUser,
    theUser,
    loggedIn,
    setLoggedIn,
    userBills,
    setTheUser,
    setUserBills,
  } = useGlobalContext();
  const [isChecked, setIsChecked] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    password2: false,
    check: false,
  });
  const [check, setCheck] = useState({
    username: "VALID",
    email: "VALID",
    password: "VALID",
    password2: "VALID",
  });
  const usn = useRef();
  const chx = useRef();
  const inp = useRef();
  const psw = useRef();
  const eml = useRef();
  const psw2 = useRef();
  const success = useRef();
  const [user, setUser] = useState({
    id: 0,
    username: "",
    password: "",
    email: "",
    password2: "",
  });

  useEffect(() => {
    setCheck(Check({ user }));
  }, [user]);

  useEffect(() => {
    if (touched.username && check.username != "VALID") {
      usn.current.innerText = check.username;
      usn.current.style.display = "flex";
    } else {
      usn.current.style.display = "none";
    }
    if (touched.email && check.email != "VALID") {
      eml.current.innerText = check.email;

      eml.current.style.display = "flex";
    } else {
      eml.current.style.display = "none";
    }
    if (touched.password && check.password != "VALID") {
      psw.current.innerText = check.password;
      psw.current.style.display = "flex";
    } else {
      psw.current.style.display = "none";
    }
    if (touched.password2 && check.password2 != "VALID") {
      psw2.current.innerText = check.password2;
      psw2.current.style.display = "flex";
    } else {
      psw2.current.style.display = "none";
    }
  }, [check]);

  useEffect(() => {
    if (!isChecked && touched.check) {
      chx.current.style.display = "flex";
      chx.current.innerText = "You must agree to the terms and conditions";
    } else {
      chx.current.style.display = "none";
    }
  }, [isChecked, touched.check]);

  const createUser = async () => {
    setCheck(Check({ user }));
    setTouched({
      username: true,
      password: true,
      email: true,
      check: true,
      password2: true,
    });
    let valid = true;
    Object.values(check).forEach((x) => {
      if (x != "VALID") valid = false;
    });

    if (valid && isChecked) {
      register(user)
        .then((prom) => {
          if (prom.status == "VALID") {
            setTimeout(() => {
              setTheUser(prom);
              success.current.style.backgroundColor = "#59b384";
              success.current.innerHTML = `<p>User has been created with <b>${user.email}</b></p>`;
              success.current.style.display = "flex";
              setTimeout(() => {
                nav("/home");
              }, 200);
            }, 300);
          } else if (prom.status == "ERROR") {
            setTimeout(() => {
              success.current.style.backgroundColor = "#d68383";
              success.current.style.color = "#170f0f";
              success.current.innerHTML = `<p>Sorry it looks like an account exists already. <b>Try again</b></p>`;
              success.current.style.display = "flex";
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  return (
    <div className="cont">
      <div className="form">
        <div className="top">
          <h1>Sign up</h1>
        </div>
        <hr />
        <div className="bottom">
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
          <label>Username</label>
          <p
            ref={usn}
            className="regErr"
            style={{
              fontWeight: "200",
              margin: "0",
            }}
            name="username"
          />
          <input
            ref={inp}
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.email
                ? check.username != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            name="username"
          ></input>
          <label>Email</label>
          <p
            ref={eml}
            className="regErr"
            style={{
              fontWeight: "200",
              margin: "0",
            }}
            name="email"
          />
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.password
                ? check.email != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            name="email"
          ></input>
          <label>Password</label>
          <p
            ref={psw}
            className="regErr"
            style={{ fontWeight: "200", margin: "0" }}
            name="password"
          ></p>
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.password2
                ? check.password != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="password"
            name="password"
          ></input>
          <label>Password</label>
          <p
            ref={psw2}
            className="regErr"
            style={{ fontWeight: "200", margin: "0" }}
            name="password2"
          ></p>
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.password2
                ? check.password2 != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="password"
            name="password2"
          ></input>
          <p
            ref={chx}
            className="regErr"
            style={{
              justifyContent: "center",
              color: "#13254f",
              fontSize: "13px",
              textAlign: "center",
              fontWeight: "200",
              margin: "0",
            }}
            name="checkbox"
          ></p>
          <div className="check">
            <input
              onChange={() => {
                touched.check = true;
                setIsChecked(!isChecked);
              }}
              value={isChecked}
              type="checkbox"
            />

            <label for="checkbox">
              I agree to these <a href="#">Terms and Conditions</a>.
            </label>
          </div>
          <button onClick={createUser}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
