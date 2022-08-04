import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./ListPodcast.css";
import SearchIcon from "@mui/icons-material/Search";

const ListPodcast = () => {
  //search filter
  const [filter, setFilter] = useState("");

  const { category } = useParams();

  const handleFilter = async () => {
    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();

    setListArray(
      data.filter((value) => {
        return value.title.toLowerCase().includes(filter.toLowerCase());
      })
    );
  };

  const filterCategory = async (category) => {
    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();

    setListArray(
      data.filter((value) => {
        return value.category.toLowerCase().includes(category.toLowerCase());
      })
    );
  };

  const [listArray, setListArray] = useState([]);
  const url = "http://localhost:5000";

  const getDataFromBackend = async () => {
    if (category) {
      filterCategory(category);
      return;
    }

    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();

    console.log(data);
    setListArray(data);
  };

  // const deletePodcast = async (id) => {
  //   console.log(id);
  //   const response = await fetch("http://localhost:5000/podcast/delete/" + id, {
  //     method: "DELETE",
  //   });
  //   if (response.status === 200) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Podcast Deleted successfully",
  //     });
  //     getDataFromBackend();
  //   }
  // };

  useEffect(() => {
    getDataFromBackend();
  }, []);
  const displayPodcasts = () => {
    return listArray.map(
      (
        {
          _id,
          title,
          description,
          thumbnail,
          file,
          uploadedBy,
          createdAt,
          category,
        },
        count
      ) => (
        <div className="col-md-6" id="carrd" style={{ marginBottom: "1%" }}>
          <div className="card mb-3" key={_id}>
            <div className="row">
              <div className="col-md-5">
                <img
                  src={url + "/" + thumbnail}
                  alt="thumbnail"
                  className="img-fluid rounded-start"
                  style={{ height: "100%" }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h4 className="card-title" style={{ color: "purple" }}>
                    <h3>Episode {count + 1}:</h3> {title}
                  </h4>
                  <hr />
                  <p className="text-muted">{category}</p>
                  <p className="card-text">{description.substring(0, 75)}</p>
                  {/* <p className="card-text" style={{ color: "purple" }}>
                    File:{file}
                  </p> */}
                  <p className="card-text">
                    <small className="text-muted">
                      Uploaded By: {uploadedBy}
                    </small>
                  </p>{" "}
                  <p className="card-text">
                    <small className="text-muted">{createdAt}</small>
                  </p>
                  <Link to={"/view/" + _id} className="btnm btn-secondary">
                    Play Now
                    <i
                      class="fa-solid fa-play"
                      style={{ paddingLeft: "9px" }}
                    ></i>
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
    <div id="list">
      <header class="text-white text-center" id="head">
        <div class="container">
          <h1 style={{ marginBottom: "2%" }}>List Podcast</h1>

          <Paper
            component="form"
            className="mx-auto"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "70%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Podcast to Search"
              onChange={(e) => setFilter(e.target.value)}
              inputProps={{ "aria-label": "Enter Podcast to Search" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleFilter}
            >
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
      <div
        className="container"
        style={{ minHeight: "100vh", paddingTop: "5%" }}
      >
        <button onClick={(e) => filterCategory("education")}>Education</button>
        <div className="">
          <div className="row text-center">{displayPodcasts()}</div>
        </div>
      </div>
    </div>
  );
};

export default ListPodcast;
