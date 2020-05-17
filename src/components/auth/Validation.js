const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validNameRegex = RegExp(/[!@#$%^&*(),.?":{}|<>0-9]/i);

const validPhoneNoRegex = RegExp("^[0-9]{10}$");

const checkMinLength = (value, length) => value.length < length;

// TODO: check email uniqueness
// const isEmailUnique = (email) => {
//   // check uniqueness
//   return false;
// };

// const countErrors = (errors) => {
//   let count = 0;
//   Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
//   return count;
// };

export const fromValidations = () => {
  console.log("from validations.js");
};

export const isErrorObjectEmpty = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    if (val.length > 0) {
      valid = false;
    }
  });
  console.log("in check validity function. Validity?", valid);
  return valid;
};

/**
 * Validates provided form input 'value' according to the provided form input 'id'
 * @param {string} id form input id
 * @param {string} value form input value
 * @param {Object} _errors component state error object
 * @returns {Object} received errors object as-is or populated if there is an error
 */

export const validate = (id, value, _errors) => {
  let errors = _errors;
  // let errors = {};
  if (id === "fN") {
    if (validNameRegex.test(value)) {
      errors[id] = "First Name must not contain special characters or numbers";
    } else if (checkMinLength(value, 3)) {
      errors[id] = "First Name must be at least 3 characters";
    } else {
      errors[id] = "";
    }
  }

  if (id === "lN") {
    if (validNameRegex.test(value)) {
      errors[id] = "Last Name must not contain special characters or numbers";
    } else if (checkMinLength(value, 3)) {
      errors[id] = "Last Name must be at least 3 characters";
    } else {
      errors[id] = "";
    }
  }

  if (id === "email" || id === "em" || id === "eM") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Email cannot be blank";
    } else if (!validEmailRegex.test(value)) {
      errors[id] = "Invalid Email";
    } else {
      errors[id] = "";
    }
  }

  if (id === "password" || id === "pwd") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Please enter your password";
    } else if (checkMinLength(value, 8)) {
      errors[id] = "Password must be at least 8 characters";
    } else {
      errors[id] = "";
    }
  }

  // Position
  if (id === "pos") {
    if (validNameRegex.test(value)) {
      errors[id] = "Position must not contain special characters or numbers";
    } else if (checkMinLength(value, 1)) {
      errors[id] = "Position should not be blank";
    } else {
      errors[id] = "";
    }
  }

  // Company name
  if (id === "cmp") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Company Name should not be blank";
    } else {
      errors[id] = "";
    }
  }

  // Address
  if (id === "adr") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Address details should not be blank";
    } else {
      errors[id] = "";
    }
  }

  // personal phone number
  if (id === "pNo") {
    if (Number(value) === 0) {
      errors[id] = "Personal Number should not be blank";
    } else if (!validPhoneNoRegex.test(value)) {
      errors[id] = "Personal Number must contain exactly 10 digits";
    } else {
      errors[id] = "";
    }
  }

  // work phone number
  if (id === "wNo") {
    if (Number(value) === 0) {
      errors[id] = "Work Number should not be blank";
    } else if (!validPhoneNoRegex.test(value)) {
      errors[id] = "Work Number must contain exactly 10 digits";
    } else {
      errors[id] = "";
    }
  }

  // profile picture
  if (id === "pPic") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Please upload a proper profile picture";
    } else {
      errors[id] = "";
    }
  }

  // visiting card front image
  if (id === "front") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Please upload visiting card front view picture";
    } else {
      errors[id] = "";
    }
  }

  // visiting card back image
  if (id === "back") {
    if (checkMinLength(value, 1)) {
      errors[id] = "Please upload visiting card back view picture";
    } else {
      errors[id] = "";
    }
  }

  // return error object
  return errors;
};
