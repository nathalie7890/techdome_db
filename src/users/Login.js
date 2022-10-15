import { useState } from "react";
import { Login as LoginApi } from "../api/users";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    await LoginApi(user);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-mediumBlue">
      <form onSubmit={loginSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={onChangeHandler}
            className="bg-transparent border-white rounded-md focus:outline-none focus:ring-0 focus:border-white"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={onChangeHandler}
            className="bg-transparent border-white rounded-md focus:outline-none focus:ring-0 focus:border-white"
          />
        </div>
        <div>
          <button
            type="submit"
            className="rounded-md px-4 py-1.5 border-white border"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
