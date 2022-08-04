import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "./ViewPodcast.css";
import SearchIcon from "@mui/icons-material/Search";

const ViewPodcast = () => {
  const [podcastArray, setPodcastArray] = useState([]);
  const [filter, setFilter] = useState("");
  const handleFilter = async () => {
    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();

    setPodcastArray(
      data.filter((value) => {
        return value.title.toLowerCase().includes(filter.toLowerCase());
      })
    );
  };
  const getDataFromBackend = async () => {
   const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();

    console.log(data);
    setPodcastArray(data);
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);



  const { id } = useParams();
  const url = "http://localhost:5000";
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPodcastById = () => {
    setLoading(true);
    fetch(url + "/podcast/getbyid/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPodcastData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPodcastById();
  }, []);

  const displayPodcastData = () => {
    console.log(loading);
    if (!loading && podcastData) {
      return (
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={url + "/" + podcastData.thumbnail}
                  alt="thumbnail"
                  className="img-fluid rounded-start"
                  style={{ height: "100%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h4 className="card-title" style={{ color: "purple" }}>
                    {podcastData.title}
                  </h4>
                  <hr />
                  <p className="card-text">
                  {podcastData.description}
                  </p>
                  {/* <p className="card-text">File:{podcastData.file}</p> */}
                  <p className="card-text">
                    <small className="text-muted">
                      Uploaded By:{podcastData.uploadedBy}
                    </small>
                  </p>
                  <ReactAudioPlayer
                    src={url + "/" + podcastData.file}
                    autoPlay
                    controls
                  />
                </div>
                <Link to="/listPodcast" className="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="view">
      <header class="bg-secondary text-white text-center" id="headd">
        <div class="container">
          <h1 style={{ marginBottom: "2%" }}>View Podcast</h1>

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
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search"onClick={handleFilter}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </header>

      <div
        className="container"
        id="viewpodcast"
        style={{ minHeight: "100vh", paddingTop: "5%" }}
      >
        <div className="row text-center">{displayPodcastData()}</div>
      </div>
    </div>
  );
};

export default ViewPodcast;
