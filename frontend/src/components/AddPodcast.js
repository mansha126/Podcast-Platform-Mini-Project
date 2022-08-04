import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./AddPodcast.css";
import CategoryIcon from "@mui/icons-material/Category";

const AddPodcast = () => {
  const [selFile, setSelFile] = useState("");
  const [selThumbnail, setSelThumbnail] = useState("");

  // const category = { Education, Science, Mystery };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const podcastForm = {
    title: "",
    description: "",
    thumbnail: "",
    file: "",
    category:"",
    uploadedBy: currentUser.username,
  };

  const podcastSubmit = async (formdata) => {
    formdata.thumbnail = selThumbnail;
    formdata.file = selFile;
    console.log(formdata);
    const response = await fetch("http://localhost:5000/podcast/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Submit successfully!!✌🎉",
      });
    } else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid Credentials",
      });
    }
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("uploaded");
      }
    });
  };

  const uploadThumbnail = (e) => {
    const file = e.target.files[0];
    setSelThumbnail(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        console.log("uploaded");
      }
    });
  };

  return (
    <div className="addpodcast">
      <div
        className="container col-md-5"
        style={{ minHeight: "100vh", paddingTop: "2%" }}
      >
        <div className="card ">
          <div
            className="card-body "
            style={{ background: "linear-gradient(to right,#ffffff,#e5d3f9)" }}
          >
            <h1 style={{ color: "purple", textAlign: "center" }}>
              Add Podcast
            </h1>
            <hr className="mb-3" />

            <Formik initialValues={podcastForm} onSubmit={podcastSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Title"
                    color="secondary"
                    variant="outlined"
                    className="w-100 mb-4 mt-2"
                    id="title"
                    onChange={handleChange}
                    value={values.title}
                  />
                  <TextField
                    label="Description"
                    color="secondary"
                    variant="outlined"
                    className="w-100 mb-4"
                    id="description"
                    onChange={handleChange}
                    value={values.description}
                    type="textarea"
                    multiline
                  />

                  <label>Upload Thumb</label>
                  <input onChange={uploadThumbnail} type="file" />
                  <hr />

                  <label>Upload File</label>
                  <input onChange={uploadFile} type="file" />
                  <hr />

                  <FormControl fullWidth color="secondary" className="mb-4">
                    <InputLabel id="demo-simple-select-label">
                      Select category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id = "category"
                      value={values.category}
                      label="Select category"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Education"}>Education</MenuItem>
                      <MenuItem value={"Science"}>Science</MenuItem>
                      <MenuItem value={"Mystery"}>Mystery</MenuItem>
                      <MenuItem value={"Tech"}>Tech</MenuItem>
                      <MenuItem value={"Society"}>Society</MenuItem>
                      <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                      <MenuItem value={"Business"}>Business</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "purple" }}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPodcast;
