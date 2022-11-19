import React from "react";
import Login from "./Landing/Login";
import EventList from "./Events/EventList";
import { checkAuth } from "./api/users";

export default function Home() {
  const { isAuth } = checkAuth();
  return !isAuth ? <Login /> : <EventList />;
}
