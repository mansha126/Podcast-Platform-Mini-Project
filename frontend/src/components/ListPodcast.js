import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./ListPodcast.css";
import SearchIcon from "@mui/icons-material/Search";

const ListPodcast = () => {
  const [listArray, setListArray] = useState([]);
  const url = "http://localhost:5000";

  const getDataFromBackend = async () => {
    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();
    console.log(data);
    setListArray(data);
  };

  const deletePodcast = async (id) => {
    console.log(id);
    const response = await fetch("http://localhost:5000/podcast/delete/" + id, {
      method: "DELETE",
    });
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Podcast Deleted successfully",
      });
      getDataFromBackend();
    }
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  const displayPodcasts = () => {
    return listArray.map(
      ({ _id, title, description, thumbnail, file, uploadedBy }) => (
        <div className="col-md-6">
          <div className="card mb-3" key={_id}>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={url + "/" + thumbnail}
                  alt="thumbnail"
                  className="img-fluid rounded-start"
                  style={{ height: "100%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h4 className="card-title" style={{ color: "purple" }}>
                    Title:{title}
                  </h4>
                  <hr />
                  <p className="card-text">Description:{description}</p>
                  <p className="card-text" style={{ color: "purple" }}>
                    File:{file}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Uploaded By:{uploadedBy}
                    </small>
                  </p>
                  <Link to={"/view/" + _id} className="btn btn-primary">
                    View Podcast
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  return (
    <div>
      <header class="text-white text-center" id="head">
        <div class="container">
          <h1 style={{ fontFamily: "Cursive",marginBottom:'2%' }}>List Podcast</h1>
          <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Podcast to Search"
              inputProps={{ "aria-label": "Enter Podcast to Search" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {/* <div class="input-group mt-4">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Podcast to Search"
            />
            <button class="btnn btn-primary">Search</button>
          </div> */}
        </div>
      </header>
      <div className="container" id="listpodcast" style={{ minHeight: "100vh",paddingTop:"5%" }}>
        <div className="card">
          <div className="row text-center">{displayPodcasts()}</div>
        </div>
      </div>
    </div>
  );
};

export default ListPodcast;
