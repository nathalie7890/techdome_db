import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Participants/Main";
import EventList from "./Events/EventList";
import Login2 from "./Landing/Landing2";
import Register2 from "./Landing/Register2";
import Login from "./Landing/Login";
import Register from "./Landing/Register";
import Contacts from "./Contacts/Contacts";
import Profile from "./User/Profile";
import NotFound from "./404";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-[100vh]">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/" element={<Login2 />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/participants" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
