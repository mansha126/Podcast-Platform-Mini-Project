import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { EmailOutlined, Margin, Visibility, VisibilityOff } from "@mui/icons-material";


const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userForm = {
    username: "",
    password: "",
    email: "",
    avatar: "",
  };

  const userSubmit = async (formdata) => {
    console.log(formdata);
    const response = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log(response.status);
      console.log("data saved");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registered successfully!!✌",
      });
      navigate("/home");
    } else {
      console.log(response.status);
      console.log("something went wrong");
      Swal.error({
        icon: "error",
        title: "OOPS",
        text: "!! something went wrong!!",
      });
    }
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short username!")
      .max(22, "Too Long username!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  return (
    <div className="signup "
   >
      <div className="container col-7" style={{ minHeight: "100vh"}}>
        <div className="card "style={{background: "linear-gradient(to right,#ffffff,#9d57ea)", marginTop:"10%"}}>
         
          <div className="row ">
            <div className="col-md">
              <img
                className="img-fluid"
                src="https://purple.ai/wp-content/uploads/2020/04/guest-wifi-featured.png"
                alt=""
              
              />
            </div>
            <div className="col-md">
              {/* <div className="card "> */}
                <div
                  className="card-body"
                  style={{
                    background: "linear-gradient(to right,#ffffff,#9d57ea)",
                  }}
                >
                  <h1 style={{ textAlign: "center", color: "purple" }}>
                    Signup Here
                  </h1>
                  <hr className="mb-5" />

                  <Formik
                    initialValues={userForm}
                    onSubmit={userSubmit}
                    validationSchema={SignupSchema}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <TextField
                          label="Username"
                          variant="standard"
                          className="w-100 mb-4"
                          id="username"
                          onChange={handleChange}
                          value={values.username}
                          helperText={errors.username}
                          error={Boolean(errors.username && touched.username)}
                        />
                        <TextField
                          label="Email"
                          variant="standard"
                          className="w-100 mb-4"
                          id="email"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <EmailOutlined />
                              </InputAdornment>
                            ),
                          }}
                          onChange={handleChange}
                          value={values.email}
                          helperText={touched.email ? errors.email : ""}
                          error={Boolean(errors.email && touched.email)}
                        />
                        <TextField
                          label="Password"
                          variant="standard"
                          className="w-100 mb-4"
                          id="password"
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={(e) =>
                                    setShowPassword(!showPassword)
                                  }
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={handleChange}
                          value={values.password}
                          helperText={touched.password ? errors.password : ""}
                          error={Boolean(errors.password && touched.password)}
                        />

                        <Button type="submit" variant="contained" fullWidth className="Btn">
                          Submit
                        </Button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Signup;
