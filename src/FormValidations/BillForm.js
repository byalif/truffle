const Check = ({ form }) => {
  const { first, last, street, zip, hospital, DOS, bill, image } = form;
  let obj = {
    first: "",
    last: "",
    street: "",
    zip: "",
    hospital: "",
    DOS: "",
    bill: "",
    image: "",
  };
  if (first) {
    obj.first = "VALID";
  } else {
    obj.first = "first name is a required field";
  }
  if (last) {
    obj.last = "VALID";
  } else {
    obj.last = "last name is a required field";
  }
  if (street) {
    if (street.length >= 2) {
      var regexp = /^(?=.*[A-Za-z])(?=.*\d)(?!.*[^A-Za-z0-9\-#\.\/ ])/;
      if (regexp.test(street)) {
        obj.street = "VALID";
      } else {
        obj.street = "enter a valid street";
      }
    } else {
      obj.street = "enter a valid street";
    }
  } else {
    obj.street = "street is a required field";
  }
  if (zip) {
    var regexp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (regexp.test(zip)) {
      obj.zip = "VALID";
    } else {
      obj.zip = "enter a valid zip";
    }
  } else {
    obj.zip = "zip is a required field";
  }
  if (hospital) {
    obj.hospital = "VALID";
  } else {
    obj.hospital = "hospital name is a required field";
  }
  if (DOS) {
    obj.DOS = "VALID";
  } else {
    obj.DOS = "DOS is a required field";
  }
  if (bill) {
    obj.bill = "VALID";
  } else {
    obj.bill = "bill is a required field";
  }
  if (image) {
    obj.image = "VALID";
  } else {
    obj.image = "VALID";
  }

  return obj;
};

export default Check;
