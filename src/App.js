import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Landing/Login";
import Reset from "./User/Reset";
import ResetPass from "./User/ResetPass";
import EventList from "./Events/EventList";
import Main from "./Participants/Main";
import Contacts from "./Contacts/Contacts";
import Profile from "./User/Profile";
import NotFound from "./Partials/404";
import GuestRoutes from "./Routes/GuestRoutes";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-[100vh] bg-white text-black">
      <Toaster />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/resetpass/:token" element={<ResetPass />} />
        </Route>
        <Route element={<UserRoutes />}>
          <Route path="/events" element={<EventList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/participants" element={<Main />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
