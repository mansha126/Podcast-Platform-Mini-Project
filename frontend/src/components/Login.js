import { EmailOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";
import { AppContext } from './AppContext';
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedIn } = useContext(AppContext)

  const [showPassword, setShowPassword] = useState(false);
  const loginForm = {
    email: "",
    password: "",
  };
  const loginSubmit = async (formdata) => {
    console.log(formdata);
    const response = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.status);

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login success!!👍",
      });

      response.json().then((data) => {
        console.log(data);

        setLoggedIn(true);

        navigate("/addPodcast");
        sessionStorage.setItem("user", JSON.stringify(data));
      });
    } else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid Credentials",
      });
    }
  };
  return (
    <div className="login">
      <div
        className="container col-md-4 col-sm-6"
        style={{ minHeight: "100vh", paddingTop: "5%" }}
      >
        <div className="card">
          <div
            className="card-body"
            style={{ background: "linear-gradient(to right,#ffffff,#e5d6f7" ,borderRadius:"8px" }}
          >
            <h1 style={{ color: "purple", textAlign: "center" }}>Sign In</h1>
            <hr className="mb-4" />

            <Formik initialValues={loginForm} onSubmit={loginSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    variant="standard"
                    color="secondary"
                    className="w-100 mb-4"
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Password"
                    color="secondary"
                    variant="standard"
                    className="w-100 mb-3"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={(e) => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="secondary" />}
                      label="Remember me"
                      labelPlacement="end"
                    />
                    <NavLink to="/otpform" className="text-body">
                      Forgot password?
                    </NavLink>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "purple" }}
                  >
                    Sign In
                  </Button>
                  <center>
                    <p style={{ paddingTop: "5%" }}>
                      Don't have an account? <a href="/signup">SIGN UP</a>
                    </p>
                  </center>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
