import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"black"}}>
        <div className="container-fluid" >
          <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbEPrCQSxt3bwTSYQV0pglF1_rSzHIxR8aFab9uRdUInfa2gxVe1DHuuz0AEn3OWAOP8s&usqp=CAU" alt="" style={{ display:"block",
        width: "70px",
        
            borderRadius: "100%"
          }} />
          <a className="navbar-brand" to="#" style={{ fontFamily: 'Satisfy', color: 'white' }}>
            PODCASTER
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={{color:"white"}}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={{color:"white"}}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup" style={{color:"white"}}>
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addPodcast" style={{color:"white"}}>
                  AddPodcast
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/listPodcast" style={{color:"white"}}>
                  ListPodcast
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/view" style={{color:"white"}}>
                  ViewPodcast
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" to="#">Action</a></li>
            <li><a className="dropdown-item" to="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" to="#">Something else here</a></li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li> */}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btnn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
