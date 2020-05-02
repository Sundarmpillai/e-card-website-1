const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validNameRegex = RegExp(/[!@#$%^&*(),.?":{}|<>0-9]/i)

const checkMinLength = (value, length) => value.length < length

// TODO: check email uniqueness
const isEmailUnique = (email) => {
  // check uniqueness
  return false;
}

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count + 1)
  );
  return count;
}

export const fromValidations = () => {
  console.log('from validations.js')
}

export const isErrorObjectEmpty = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    if (val.length > 0) { (valid = false); } 
  });
  console.log('in check validity function valid??', valid);
  return valid;
}

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
  if (id === 'fN') {
    if (validNameRegex.test(value)) {
      errors.fN = 'First Name must not contain special characters or numbers'
    } else if (checkMinLength(value, 3)) {
      errors.fN = 'First Name must be at least 3 characters'
    } else {
      errors.fN = ''
    }
  }

  if (id === 'lN') {
    if (validNameRegex.test(value)){
      errors.lN = 'Last Name must not contain special characters or numbers'
    } else if (checkMinLength(value, 3)) {
      errors.lN = 'Last Name must be at least 3 characters'
    } else {
      errors.lN = ''
    }
  }

  if (id === 'em') {
      if (checkMinLength(value, 1)) {
          errors.eM = 'Email cannot be blank'
      } else if (!validEmailRegex.test(value)) {
          errors.eM = 'Invalid Email'
      } else {
          errors.eM = ''
      }
  }

  if (id === 'pwd') {
      if (checkMinLength(value, 8)) {
          errors.pwd = 'Password must be at least 8 characters'
      } else {
          errors.pwd = ''
      }
  }

  // serparate login validations because id is different from Register form fields

  if (id === 'email') {
    if (checkMinLength(value, 1)) {
        errors.email = 'Email cannot be blank'
    } else if (!validEmailRegex.test(value)) {
        errors.email = 'Invalid Email'
    } else {
        errors.email = ''
    }
  }

  if (id === 'password') {
    if (checkMinLength(value, 1)) {
        errors.password = 'Please enter your password'
    } else {
        errors.password = ''
    }
  }

  // return error object
  return errors;
}
