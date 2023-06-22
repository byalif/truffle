export const register = async (user) => {
  let users = JSON.parse(localStorage.getItem("users"));
  user.status = "VALID";
  if (users) {
    users.forEach((x) => {
      if (user.email === x.email) {
        user.status = "ERROR";
        return;
      }
    });

    if (user.status !== "ERROR") {
      user.id = users.length;
      users = [...users, user];
      localStorage.setItem("users", JSON.stringify(users));
    }
  } else {
    localStorage.setItem("users", JSON.stringify([user]));
    user.id = users.length;
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
};

export const signin = async (user) => {
  const defaultUser = {
    id: 0,
    username: "",
    password: "",
    email: "",
    status: "",
  };

  let users = JSON.parse(localStorage.getItem("users"));
  defaultUser.status = "ERROR";
  let count = 0;
  if (users) {
    users.forEach((x) => {
      if (user.username === x.email) {
        count++;
        if (user.password === x.password) {
          defaultUser.id = x.id;
          defaultUser.username = x.username;
          defaultUser.password = x.password;
          defaultUser.email = x.email;
          defaultUser.status = "VALID";
          localStorage.setItem("user", JSON.stringify(defaultUser));
        } else {
          defaultUser.status = "WRONG";
        }
        return;
      }
    });
  } else {
    defaultUser.status = "NULL";
  }

  if (count == 0) defaultUser.status = "NULL";
  return defaultUser;
};

export const addBill = async (bill) => {
  let bills = JSON.parse(localStorage.getItem("bills"));
  let ret = "VALID";
  if (!bills) {
    bill.id = 0;
    bill.userId = JSON.parse(localStorage.getItem("user")).id;
    localStorage.setItem("bills", JSON.stringify([bill]));
  } else {
    bill.userId = JSON.parse(localStorage.getItem("user")).id;
    bill.id = bills.length;
    bills = [...bills, bill];
    localStorage.setItem("bills", JSON.stringify(bills));
  }

  return ret;
};

export const editBill = async (bill, id) => {
  let bills = JSON.parse(localStorage.getItem("bills"));
  let ret = "VALID";

  bills.forEach((f) => {
    if (f.id == id) {
      f.first = bill.first;
      f.last = bill.last;
      f.street = bill.street;
      f.zip = bill.zip;
      f.hospital = bill.hospital;
      f.DOS = bill.DOS;
      f.bill = bill.bill;
      f.image = bill.image;
      return;
    }
  });

  localStorage.setItem("bills", JSON.stringify(bills));

  return ret;
};

export const getTheUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return { email: "NOT_FOUND" };
  } else {
    return user;
  }
};
