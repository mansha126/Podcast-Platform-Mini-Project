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
import Authorisor from "./components/Auth";
import ResetPassword from "./components/ResetPassword";
import OtpForm from "./components/OtpForm";
import { AppProvider } from "./components/AppContext";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  return (
    <AppProvider currentUser={currentUser}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route element={<Home></Home>} path="/" />
          <Route element={<Login></Login>} path="login" />
          <Route element={<Signup></Signup>} path="signup" />
          <Route
            element={
              <Authorisor>
                <AddPodcast></AddPodcast>
              </Authorisor>
            }
            path="addPodcast"
          />
          <Route element={<ListPodcast></ListPodcast>} path="listPodcast" />
          <Route
            element={<ListPodcast></ListPodcast>}
            path="listPodcast/:category"
          />
          <Route element={<UpdateUser></UpdateUser>} path="updateUser" />
          <Route element={<ViewPodcast />} path="view/:id" />
          <Route element={<Trial></Trial>} path="trial" />
          <Route element={<ViewPodcast />} path="view" />
          <Route element={<ResetPassword />} path="resetpassword" />
          <Route element={<OtpForm />} path="otpform" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
