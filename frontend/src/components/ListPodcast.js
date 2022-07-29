import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListPodcast = () => {
  const [listArray, setListArray] = useState([]);
  const url  = 'http://localhost:5000';

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
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={url+'/'+thumbnail}
                  alt=""
                  className="img-fluid rounded-start" style={{height:"100%"}}
                />
              </div>
              <div className="col-md-6" >
                <div className="card-body">
                  <h4 className="card-title" style={{color:"purple"}}>Title:{title}</h4>
                  <h5 className="card-text"style={{color:"purple"}}>Description:{description}</h5>
                  <p className="card-text"style={{color:"purple"}}>File:{file}</p>
                  <p className="card-text">
                    <small className="text-muted">Uploaded By:{uploadedBy}</small>
                  </p>
                  <Link to={'/view/'+_id} className="btn btn-primary">View Podcast</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  return (
    
      <div className="container-fluid bg-dark" style={{minHeight:"100vh"}}>
        <h1 className="text-center text-white">ListPodcast</h1>
        <div className="card">
          <div className="row text-center">{displayPodcasts()}</div>
        </div>
      </div>
    
  );
};

export default ListPodcast;
