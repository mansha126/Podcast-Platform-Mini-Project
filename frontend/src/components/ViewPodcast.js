import React from "react";
import ReactAudioPlayer from "react-audio-player";

const ViewPodcast = () => {
  return (
    <div>
      ViewPodcast
      <div className="card">
        <div className="row">
          <div className="col">
            <img src="" alt="" />
          </div>
          <div className="col">
            <div className="card-body">
              <h5 className="card-title">Title:</h5>
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
    </div>
  );
};

export default ViewPodcast;
