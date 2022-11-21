import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Landing/Login";
import Reset from "./User/Reset";
import ResetPass from "./User/ResetPass";
import EventList from "./Events/EventList";
import Main from "./Participants/Main";
import Contacts from "./Contacts/Contacts";
import Profile from "./User/Profile";
import NotFound from "./404";
import GuestRoutes from "./Routes/GuestRoutes";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-[100vh] bg-blue-800 text-black">
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
