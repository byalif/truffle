import React, { useEffect, useState, useRef } from "react";
import Check from "../FormValidations/BillForm.js";
import { addBill, editBill } from "../services/services.js";
import { useGlobalContext } from "../context";
import { getTheUser } from "../services/services.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Form = () => {
  const [isloading, setLoading] = useState(false);
  let { id } = useParams();
  const {
    setTheUser,
    getUser,
    theUser,
    theBill,
    setTheBill,
    loggedIn,
    setLoggedIn,
    userBills,
    setUserBills,
  } = useGlobalContext();
  const nav = useNavigate();
  const [touched, setTouched] = useState({
    first: false,
    last: false,
    street: false,
    zip: false,
    hospital: false,
    DOS: false,
    bill: false,
    image: false,
  });
  const [check, setCheck] = useState({
    first: "VALID",
    last: "VALID",
    street: "VALID",
    zip: "VALID",
    hospital: "VALID",
    DOS: "VALID",
    bill: "VALID",
    image: "VALID",
  });
  const fName = useRef();
  const success = useRef();
  const lName = useRef();
  const street = useRef();
  const zip = useRef();
  const hospital = useRef();
  const DOS = useRef();
  const bill = useRef();
  const image = useRef();

  useEffect(() => {
    if (id) {
      console.log(id);
      setForm({
        userId: theBill.userId,
        first: theBill.first,
        last: theBill.last,
        street: theBill.street,
        zip: theBill.zip,
        hospital: theBill.hospital,
        DOS: theBill.DOS,
        bill: theBill.bill,
        image: theBill.image,
      });
    }
  }, [id]);

  useEffect(() => {
    getTheUser()
      .then((x) => {
        if (x.email !== "NOT_FOUND") {
          setTheUser(x);
          console.log("logged in");
          setLoggedIn(true);
        } else {
          nav("/login");
          setLoggedIn(false);
          setTheUser({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [form, setForm] = useState({
    userId: -1,
    first: "",
    last: "",
    street: "",
    zip: "",
    hospital: "",
    DOS: "",
    bill: "",
    image: "",
  });

  useEffect(() => {
    setCheck(Check({ form }));
  }, [form]);

  useEffect(() => {
    if (touched.first && check.first != "VALID") {
      fName.current.innerText = check.first;
      fName.current.style.display = "flex";
    } else {
      fName.current.style.display = "none";
    }
    if (touched.last && check.last != "VALID") {
      lName.current.innerText = check.last;
      lName.current.style.display = "flex";
    } else {
      lName.current.style.display = "none";
    }
    if (touched.street && check.street != "VALID") {
      street.current.innerText = check.street;
      street.current.style.display = "flex";
    } else {
      street.current.style.display = "none";
    }
    if (touched.zip && check.zip != "VALID") {
      zip.current.innerText = check.zip;
      zip.current.style.display = "flex";
    } else {
      zip.current.style.display = "none";
    }
    if (touched.hospital && check.hospital != "VALID") {
      hospital.current.innerText = check.hospital;
      hospital.current.style.display = "flex";
    } else {
      hospital.current.style.display = "none";
    }
    if (touched.DOS && check.DOS != "VALID") {
      DOS.current.innerText = check.DOS;
      DOS.current.style.display = "flex";
    } else {
      DOS.current.style.display = "none";
    }
    if (touched.bill && check.bill != "VALID") {
      bill.current.innerText = check.bill;
      bill.current.style.display = "flex";
    } else {
      bill.current.style.display = "none";
    }
    if (touched.image && check.image != "VALID") {
      image.current.innerText = check.image;
      image.current.style.display = "flex";
    } else {
      image.current.style.display = "none";
    }
  }, [check]);

  const uploadImage = (files) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "bzmruulb");

    fetch(`https://api.cloudinary.com/v1_1/dcchunhwy/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.public_id != "") {
          setForm(() => {
            setLoading(false);
            return {
              ...form,
              ["image"]: data.public_id,
            };
          });
          console.log(data);
        }
      });
  };

  const createUser = async () => {
    setCheck(Check({ form }));
    setTouched({
      first: true,
      last: true,
      street: true,
      zip: true,
      hospital: true,
      DOS: true,
      bill: true,
      image: true,
    });
    let valid = true;
    Object.values(check).forEach((x) => {
      if (x != "VALID") valid = false;
    });

    if (valid) {
      if (id) {
        editBill(form, id)
          .then((prom) => {
            console.log(prom);
            if (prom == "VALID") {
              setTimeout(() => {
                success.current.style.backgroundColor = "#59b384";
                success.current.innerHTML = `<p>Bill has been updated!</p>`;
                success.current.style.display = "flex";
                setTimeout(() => {
                  nav("/home");
                }, 300);
              }, 200);
            } else if (prom == "ERROR") {
              setTimeout(() => {
                success.current.style.backgroundColor = "#d68383";
                success.current.style.color = "#170f0f";
                success.current.innerHTML = `<p>Oops.. server error<b>Try again</b></p>`;
                success.current.style.display = "flex";
              });
            }
            if (Array.isArray(prom.data)) {
              prom.data.forEach((x) => {
                setCheck({
                  ...check,
                  [x.path]: x.status,
                });
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        addBill(form)
          .then((prom) => {
            console.log(prom);
            if (prom == "VALID") {
              setTimeout(() => {
                success.current.style.backgroundColor = "#59b384";
                success.current.innerHTML = `<p>Bill has been added!</p>`;
                success.current.style.display = "flex";
                setTimeout(() => {
                  nav("/home");
                }, 300);
              }, 200);
            } else if (prom == "ERROR") {
              setTimeout(() => {
                success.current.style.backgroundColor = "#d68383";
                success.current.style.color = "#170f0f";
                success.current.innerHTML = `<p>Oops.. server error<b>Try again</b></p>`;
                success.current.style.display = "flex";
              });
            }
            if (Array.isArray(prom.data)) {
              prom.data.forEach((x) => {
                setCheck({
                  ...check,
                  [x.path]: x.status,
                });
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const changeValue = (e) => {
    setForm({
      ...form,
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
          <h1>Medical bill</h1>
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
            name="first"
          />
          <label>First Name</label>
          <p
            ref={fName}
            className="regErr"
            style={{
              fontWeight: "200",
              margin: "0",
            }}
            name="first"
          />
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.lastName
                ? check.firstName != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            name="first"
            value={form.first}
          ></input>
          <label>Last Name</label>
          <p
            ref={lName}
            className="regErr"
            style={{
              fontWeight: "200",
              margin: "0",
            }}
            name="last"
          />
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.street
                ? check.lastName != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            value={form.last}
            name="last"
          ></input>
          <label>Street</label>
          <p
            ref={street}
            className="regErr"
            style={{ fontWeight: "200", margin: "0" }}
            name="street"
          ></p>
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.zip
                ? check.street != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            value={form.street}
            name="street"
          ></input>
          <label>Zip</label>
          <p
            ref={zip}
            className="regErr"
            style={{ fontWeight: "200", margin: "0" }}
            name="zip"
          ></p>
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.hospital
                ? check.zip != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            value={form.zip}
            name="zip"
          ></input>
          <label>Hopital Name</label>
          <p
            ref={hospital}
            className="regErr"
            style={{
              fontWeight: "200",
              margin: "0",
            }}
            name="hospital"
          />
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.DOS
                ? check.hospital != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            value={form.hospital}
            name="hospital"
          ></input>

          <label>Date of Service</label>
          <p
            ref={DOS}
            className="regErr"
            style={{
              fontWeight: "200",
              margin: "0",
            }}
            name="DOS"
          />
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.bill
                ? check.DOS != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="date"
            name="DOS"
            value={form.DOS}
          ></input>
          <label>Bill Amount</label>
          <p
            ref={bill}
            className="regErr"
            style={{ fontWeight: "200", margin: "0" }}
            name="street"
          ></p>
          <input
            style={{ boxShadow: "none", backgroundColor: "transparent" }}
            onChange={changeValue}
            className={`form-control  mb-3 ${
              touched.image
                ? check.bill != "VALID"
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="number"
            value={form.bill}
            name="bill"
          ></input>
          <label>Image</label>
          <p
            ref={image}
            className="regErr"
            style={{ fontWeight: "200", margin: "0" }}
            name="image"
          ></p>
          <input
            style={{
              borderBottom: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
            className="custom-file-input"
            type="file"
            name="image"
          ></input>

          <button
            style={{ cursor: `${isloading ? "not-allowed" : "pointer"}` }}
            disabled={isloading}
            onClick={createUser}
          >
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
