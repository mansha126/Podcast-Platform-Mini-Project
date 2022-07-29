import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";

const ViewPodcast = () => {
  const { id } = useParams();
  // const url = app_config.api_url;
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
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={url+"/"+podcastData.thumbnail} alt="thumb" />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Title: {podcastData.title}</h5>
                  <p className="card-text">Description:{podcastData.description}</p>
                  {/* <p className="card-text">File:{podcastData.file}</p> */}
                <p className="card-text">
                    <small className="text-muted">Uploaded By:{podcastData.uoloadedBy }</small>
                </p>
                <ReactAudioPlayer
                  src={url+"/"+ podcastData.file}
                  autoPlay
                  controls
                />
              </div>
            </div>
          </div>
          </div>
          </div>
      );
    }
  };

  return (
    <div className="container-fluid bg-dark"style={{minHeight:"100vh"}}>
        <header className="stories-header">
          <Typography className="text-center text-white" variant="h2"style={{ fontFamily: "Cursive"}}>
            ViewPodcast
          </Typography>
          
        
            
          </header>
        <div className="card">
          <div className="row text-center">
          {displayPodcastData()}
          </div></div>
    </div>
  );
};

export default ViewPodcast;
