const Check = ({ user }) => {
  const { username, password, password2, email } = user;
  let obj = {
    username: "",
    password: "",
    email: "",
    password2: "",
  };
  if (username) {
    if (username.length >= 3) {
      var regexp = /^\S+$/;
      if (regexp.test(username)) {
        obj.username = "VALID";
      } else {
        obj.username = "username must not include spaces";
      }
    } else {
      obj.username = "username must be at least 3 characters";
    }
  } else {
    obj.username = "username is a required field";
  }
  if (email) {
    if (email.length >= 3) {
      var regexp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (regexp.test(email)) {
        obj.email = "VALID";
      } else {
        obj.email = "enter a valid email";
      }
    } else {
      obj.email = "enter a valid email";
    }
  } else {
    obj.email = "email is a required field";
  }
  if (password) {
    if (password.length >= 6) {
      obj.password = "VALID";
    } else {
      obj.password = "password must be at least 6 characters";
    }
  } else {
    obj.password = "password is a required field";
  }
  if (password2) {
    if (password2.length >= 6) {
      if (password2 == password) {
        obj.password2 = "VALID";
      } else {
        obj.password2 = "passwords do not match";
      }
    } else {
      obj.password2 = "password must be at least 6 characters";
    }
  } else {
    obj.password2 = "password is a required field";
  }

  return obj;
};

export default Check;
