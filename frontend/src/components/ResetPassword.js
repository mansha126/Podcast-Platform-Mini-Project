import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BiLogIn } from "react-icons/bi";
import axios from "axios";
function ResetPassword(props) {
  const [inputField, setInputField] = useState({
    otpCode: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  // const history = useHistory()
  const [errField, setErrField] = useState({
    otpCodeErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      otpCodeErr: "",
      passwordErr: "",
      confirmPasswordErr: "",
    });
    if (inputField.otpCode == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        otpCodeErr: "Please Enter Email",
      }));
    }
    if (inputField.password == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }
    if (inputField.confirmPassword == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        confirmPasswordErr: "Please Enter Confirm Password",
      }));
    }
    if (
      inputField.confirmPassword != "" &&
      inputField.password != inputField.confirmPassword
    ) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        confirmPasswordErr: "Password are not matched",
      }));
    }
    return formIsValid;
  };
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.username]: e.target.value });
  };
  const submitButton = async () => {
    if (validForm()) {
      Object.assign(inputField.props);
      let url = "http://localhost:8000/otp/change-password";
      let options = {
        method: "POST",
        url: url,
        data: inputField,
      };
      try {
        let response = await axios(options);
        console.log(response);
        if (response.data.statusText == "Success") {
          toast.success(response.data.message);
          //  history.push('./login')
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Form Invalid");
    }
  };
    navigate("/otpform");

  return (
    <form autoComplete="off" action="" method="post">
      <ToastContainer />
      <div className="col-mb-3">
        <label htmlFor="" className="form-label">
          Otp Code
        </label>
        <input
          type="email"
          className="form-control"
          name="otpCode"
          maxLength="4"
          autoComplete="off"
          value={inputField.otpCode}
          onChange={inputHandler}
        />
        {errField.otpCodeErr.length > 0 && (
          <span className="error">{errField.otpCodeErr}</span>
        )}
      </div>
      <div className="col-mb-3">
        <label htmlFor="" className="form-label">
         Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          maxLength="4"
          autoComplete="off"
          value={inputField.password}
          onChange={inputHandler}
        />
        {errField.passwordErr.length > 0 && (
          <span className="error">{errField.passwordErr}</span>
        )}
      </div>
      <div className="col-mb-3">
        <label htmlFor="" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          maxLength="4"
          autoComplete="off"
          value={inputField.confirmPassword}
          onChange={inputHandler}
        />
        {errField.confirmPasswordErr.length > 0 && (
          <span className="error">{errField.confirmPasswordErr}</span>
        )}
      </div>
      <div>
        <button className="btn btn-primary" onClick={submitButton}>
          Login
          <BiLogIn style={{ fontSize: "22" }} />
        </button>
        &nbsp;
        <Link to="/login">
          <button className="btn btn-success">Back</button>
        </Link>
      </div>
    </form>
  );
}

export default ResetPassword;
