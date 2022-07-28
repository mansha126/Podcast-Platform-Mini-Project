import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddPodcast = () => {
  const podcastForm = {
    title: "",
    description: "",
    thumbnail: "",
    file: "",
    uploadedBy: "",
  };

  const [selFile, setSelFile] = useState("");
  const [selThumbnail, setSelThumbnail] = useState("");

  const podcastSubmit = async (formdata) => {
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
      <div className="container col-md-6" style={{ minHeight: "100vh" }}>
        <div className="card " style={{ marginTop: "10%" }}>
          <div
            className="card-body "
            style={{ background: "linear-gradient(to right,#ffffff,#9d57ea)" }}
          >
            <h1 style={{ color: "purple", textAlign: "center" }}>
              Add Podcast
            </h1>

            <Formik initialValues={podcastForm} onSubmit={podcastSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    className="w-100 mb-4"
                    id="title"
                    onChange={handleChange}
                    value={values.title}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    className="w-100 mb-4"
                    id="description"
                    onChange={handleChange}
                    value={values.description}
                  />
                  <TextField
                    type="url"
                    label="Thumbnail"
                    variant="outlined"
                    className="w-100 mb-4"
                    id="thumbnail"
                    onChange={handleChange}
                    value={values.thumbnail}
                  />
                  <TextField
                    label="File"
                    variant="outlined"
                    className="w-100 mb-4"
                    id="file"
                    onChange={handleChange}
                    value={values.file}
                  />
                  <TextField
                    label="UploadedBy"
                    variant="outlined"
                    className="w-100 mb-4"
                    id="uploadedBy"
                    onChange={handleChange}
                    value={values.uploadedBy}
                  />

                  <label>Upload Thumb</label>
                  <input onChange={uploadThumbnail} type="file" />

                  <label>Upload File</label>
                  <input onChange={uploadFile} type="file" />

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
  );
};

export default AddPodcast;
