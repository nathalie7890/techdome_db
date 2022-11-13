import React from "react";
import Login2 from "./Landing/Landing2";
import EventList from "./Events/EventList";
import { checkAuth } from "./api/users";

export default function Home() {
  const { isAuth } = checkAuth();
  return !isAuth ? <Login2 /> : <EventList />;
}
