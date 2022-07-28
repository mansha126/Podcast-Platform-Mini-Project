import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddPodcast from "./components/AddPodcast";
import ListPodcast from "./components/ListPodcast";
import UpdateUser from "./components/UpdateUser";
import Footer from "./components/Footer";
import Trial from "./components/Trial";
import ViewPodcast from "./components/ViewPodcast";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route element={<Home></Home>} path="/" />
        <Route element={<Login></Login>} path="login" />
        <Route element={<Signup></Signup>} path="signup" />
        <Route element={<AddPodcast></AddPodcast>} path="addPodcast" />
        <Route element={<ListPodcast></ListPodcast>} path="listPodcast" />
        <Route element={<UpdateUser></UpdateUser>} path="updateUser" />
        <Route element={<Trial></Trial>} path="trial" />
        <Route element={<ViewPodcast />} path="view" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
