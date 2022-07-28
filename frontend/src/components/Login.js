import { EmailOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Login.css"

const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = {
    email: "",
    password:""
  }
  const loginSubmit = async (formdata) => {
    console.log(formdata)
    const response = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log(response.status);

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login success!!👍",
      
      });
      response.json().then(data => {
        console.log(data);
        navigate('/listPodcast');
        sessionStorage.setItem("user", JSON.stringify(data));
      })
    } else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid Credentials",
      });
    }
  }
  return (
    <div className="login"style={{justifyContent:'center'}}>
      <div className="container col-md-4 col-sm-6 mx-auto my-auto"style={{minHeight:'100vh' }}>
    <div className="card" style={{ marginTop:"10%"}}>
      <div className="card-body" style={{background:"linear-gradient(to right,#ffffff,#9d57ea)"}}>
    <h1 style={{color:"purple",textAlign:"center"}}>Log in to Podcaster</h1>
    <hr className="mb-5" />

    <Formik
      initialValues={loginForm}
      onSubmit={loginSubmit}
      
    >
      {({ values, handleChange, handleSubmit, }) => (
        <form onSubmit={handleSubmit}>
        
          <TextField
            label="Email"
            variant="standard"
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
            variant="standard"
            className="w-100 mb-4"
            id="password"
            onChange={handleChange}
                  value={values.password}
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
            />

          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      )}
    </Formik>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login