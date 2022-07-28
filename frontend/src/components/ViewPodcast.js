import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";

const ViewPodcast = () => {

  const {id} = useParams();
  const url = "http://localhost:5000";
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPodcastById = () => {
    setLoading(true);
    fetch(url+'/podcast/getbyid/'+id).then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      setPodcastData(data);
      setLoading(false);
    })
  }

  useEffect(() => {
    getPodcastById();
  }, []);

  const displayPodcastData = () => {
    console.log(loading);
    if(!loading && podcastData){
      return <div className="card">
      <div className="row">
        <div className="col">
          <img src="" alt="" />
        </div>
        <div className="col">
          <div className="card-body">
            <h5 className="card-title">Title: {podcastData.title}</h5>
            <p className="card-text">Description:</p>
            <p className="card-text">File:</p>
            <p className="card-text">
              <small className="text-muted">Uploaded By:</small>
            </p>
            <ReactAudioPlayer src="" autoPlay controls/>
          </div>
        </div>
      </div>
    </div>
    }
  }
  

  return (
    <div>
      ViewPodcast
      {displayPodcastData()}
    </div>
  );
};

export default ViewPodcast;
