import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Participants/Main";
import EventList from "./Events/EventList";
import Landing from "./Landing/Landing";
import EnhancedTable from "./Events/MuiTable";

function App() {
  return (
    <div className="min-h-[100vh] bg-purple-200">
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<EventList />} />
        <Route path="/participants" element={<Main />} />
        <Route path="mui" element={<EnhancedTable/>}/>
      </Routes>
    </div>
  );
}

export default App;
