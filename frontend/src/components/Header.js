import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "./AppContext";
import { useContext } from "react";
import "./Header.css";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const [filter, setFilter] = useState("");

  const handleFilter = async () => {
    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();

    setListArray(
      data.filter((value) => {
        return value.title.toLowerCase().includes(filter.toLowerCase());
      })
    );
  };
  const [listArray, setListArray] = useState([]);
  const url = "http://localhost:5000";
  const getDataFromBackend = async () => {
    const response = await fetch("http://localhost:5000/podcast/getall");
    const data = await response.json();
    console.log(data);
    setListArray(data);
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);


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
                  className="nav-link  text-white"
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discover
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/education">
                      Education
                    </Link>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Mystery
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Science
                    </a>
                  </li><li>
                    <a className="dropdown-item" href="#">
                      Society
                    </a>
                  </li><li>
                    <a className="dropdown-item" href="#">
                      Tech
                    </a>
                  </li><li>
                    <a className="dropdown-item" href="#">
                      Business
                    </a>
                  </li>
                </ul>
              </li>
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
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Podcast to Search"
                type="text"
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
              {/* <div class="Hotbg">
            <input type="text" name="" class="Hotbg-txt" placeholder="Enter Podcast to search"/>
            <a href="#" class="Hotbg-btn">
                <i class="fa fa-search"></i>
            </a>
        </div> */}
            </Paper>
            {!loggedIn ? (
              <li className="nav">
                <NavLink className="btnx btn-primary" to="/login">
                  Login Now
                </NavLink>
              </li>
            ) : (
              <NavLink onClick={logout} className="btnx btn-danger"to="/">
                Logout
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
