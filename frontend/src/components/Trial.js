import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { EmailOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Trial = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const signup = {
    username: "",
    email: "",
    password: "",
  };
  const userSubmit = async (formdata) => {
    console.log(formdata);
    const response = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log(response.status);
      console.log("success");
      Swal.fire({
        icon: "success",
        title: "Well Done",
        text: "You have done a wonderful job !! 👍👍",
      });
      navigate("/login");
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
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short username!")
      .max(5, "Too Long username !")
      .required("Required is required"),

    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div
          class="col-sm-6 px-0 d-none d-sm-block banner"
          style={{
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        >
          <img
            className="img-fluid image"
            // style={{background:"content",backgroundSize:'fixed'}}
            src="https://cdn.creators3d.com/site/stripe_2.jpg"
            alt=""
          />
          <h1 className="heading">LET'S GET YOU ON BOARD</h1>
          <p className="paragraph">Welcome to our 3D Model sharing site!</p>
        </div>
        <div class="col-sm-6 " style={{ color: "white" }}>
          <div className="signup-cont">
            <div className="">
              <div className="col-md-6 col-sm-6 mx-auto">
                <button className="btn btn-success w-100 mt-2">
                  Continue with Google
                </button>
                <button className="btn btn-primary w-100 mt-4">
                  Continue with Facebook
                </button>
                <div className="">
                  <div className="card-body">
                    <h4 style={{ textAlign: "center", marginTop: "2%" }}>
                      <i style={{ top: "" }}>OR</i>
                    </h4>
                    <hr className="mb-4" />
                    <h4 style={{ textAlign: "center" }}>
                      <i>SignUP</i>
                    </h4>
                    <Formik
                      initialValues={signup}
                      onSubmit={userSubmit}
                      validationSchema={formSchema}
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
                            className="w-100 mb-3
                      "
                            id="username" // else we use name ="username"
                            onChange={handleChange}
                            value={values.username}
                            helperText={touched.username ? errors.username : ""}
                            error={Boolean(errors.username && touched.username)}
                          />
                          <TextField
                            label="Email"
                            variant="standard"
                            className="w-100 mb-3"
                            id="email"
                            s
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
                          <Button type="submit" variant="contained" fullWidth>
                            {" "}
                            Sign Up
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
      </div>
    </div>
  );
};

export default Trial;

// const displayUsers = () => {
//   return listArray.map(
//     ({ _id, title, description, thumbnail, file, uploadedBy }) => (
//       <div className="col-md-6">
//         <div className="card mb-3" key={_id}>
//           <div className="row g-0">
//             <div className="col-md-4">
//               <img
//                 src={thumbnail}
//                 alt=""
//                 className="img-fluid rounded-start" style={{height:"100%"}}
//               />
//             </div>
//             <div className="col-md-6" >
//               <div className="card-body">
//                 <h4 className="card-title" style={{color:"purple"}}>Title:{title}</h4>
//                 <h5 className="card-text"style={{color:"purple"}}>Description:{description}</h5>
//                 <p className="card-text"style={{color:"purple"}}>File:{file}</p>
//                 <p className="card-text">
//                   <small className="text-muted">Uploaded By:{uploadedBy}</small>
//                 </p>
//             <Link to={'/view/'+_id} className="btn btn-primary">View Podcast</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };
// return (
//   <div>
//     <h1 style={{color:"#e12b5f"}}>ListPodcast</h1>
//     <div className="card mb-3">
//       <div className="row">{displayUsers()}</div>
//     </div>
//   </div>
// );
// };
