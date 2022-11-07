import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Participants/Main";
import EventList from "./Events/EventList";
import Landing from "./Landing/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-[100vh] bg-purple-200">
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
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<EventList />} />
        <Route path="/participants" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
