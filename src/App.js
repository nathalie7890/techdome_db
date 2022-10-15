import React from "react";
//import Dashboard from './Dashboard/Dashboard'
import Login from "./users/Login";
import Main from "./Participants/Main";

function App() {
  return (
    <div className="min-h-[100vh] ">
      {!localStorage.getItem("token") ? <Login /> : <Main />}
    </div>
  );
}

export default App;
