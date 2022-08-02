import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "./AppContext";
import { useContext } from "react";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = () => {
    //1.destroy session value
    sessionStorage.removeItem("user");
    //2. set the current user to null
    setLoggedIn(false);
    //3.navigate to login page
    navigate("/authenticate");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <img
            className="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbEPrCQSxt3bwTSYQV0pglF1_rSzHIxR8aFab9uRdUInfa2gxVe1DHuuz0AEn3OWAOP8s&usqp=CAU"
            alt=""
            style={{
              display: "block",
              width: "70px",

              borderRadius: "100%",
            }}
          />
          <a
            className="navbar-brand"
            to="#"
            style={{ fontFamily: "Cursive", color: "white" }}
          >
            PODCASTER
          </a>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0 "
              style={{ fontSize: "19px" }}
            >
              <li className="nav-item ">
                <NavLink
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/signup">
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/addPodcast">
                  AddPodcast
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/listPodcast">
                  ListPodcast
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link text-white" to="/view">
                  ViewPodcast
                </NavLink>
              </li> */}
            </ul>

            <Paper
              component="form"
              sx={{
                p: "0 3px",
                display: "flex",
                alignItems: "center",
                width: 350,
              }}
            >
              {/* <InputBase
                class="Hotbg"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Podcast to Search"
                inputProps={{ "aria-label": "Enter Podcast to Search" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton> */}
              <div class="Hotbg">
                <input
                  type="text"
                  name=""
                  class="Hotbg-txt"
                  placeholder="Search >>>"
                />
                <a href="#" class="Hotbg-btn">
                  <i class="fa fa-search"></i>
                </a>
              </div>
            </Paper>
            {!loggedIn ? (
              <li className="nav">
                <NavLink className="btn" to="/login">
                  Login Now
                </NavLink>
              </li>
            ) : (
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
