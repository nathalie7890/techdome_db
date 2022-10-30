import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Participants/Main";
import EventList from "./Events/EventList";
function App() {
  return (
    <div className="min-h-[100vh] bg-purple-200">
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/participants" element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
