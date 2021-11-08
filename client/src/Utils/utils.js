export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (pass1, pass2) => {
  const passCheck = {
    isCorrect: false,
    msg: ""
  };
  if (pass1.length < 6 || pass2.length < 6) {
    passCheck.isCorrect = false;
    passCheck.msg = "Password Length is Less than 6!";
    return passCheck;
  }
  if (pass1 === pass2) {
    passCheck.isCorrect = true;
    passCheck.msg = "";
    return passCheck;
  } else {
    passCheck.isCorrect = false;
    passCheck.msg = "Password Doesn't Match!";
    return passCheck;
  }
}