import jwt_decode from "jwt-decode";
import moment from "moment/moment";

export const register = async (user) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/register`, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const login = async (user) => {
  try {
    localStorage.removeItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok && data.token !== undefined) {
      localStorage.setItem("token", data.token);
      return data;
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return;
};

export const checkAuth = () => {
  const now = moment().valueOf();
  let user = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;

  let isAuth =
    localStorage.getItem("token") && now < moment.unix(user.exp) ? true : false;

  let isAdmin = user && user.data.isAdmin ? true : false;
  return { isAuth, user, isAdmin };
};

export const getUser = async () => {
  try {
    const user = localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : null;

    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/${user.data._id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUsers = async (filters) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(filters),
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const changeRole = async (id, role) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, role }),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteOne = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    if (res.ok) return data;
    else return data.msg;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteMany = async (users) => {
  try {
    const id = [];
    for (let i of users) {
      id.push(i.id);
    }

    const res = await fetch(`${process.env.REACT_APP_API_URI}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUser = async (user) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updatePassword = async (pass) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/pass`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(pass),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error();
  }
};

export const getWithToken = async (token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/users/token/${token}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const sendResetEmail = async (email) => {
  try {
    const findUser = await fetch(
      `${process.env.REACT_APP_API_URI}/users/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (findUser.status === 404) return 404;

    const res = await fetch(`${process.env.REACT_APP_API_URI}/users/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const resetPassword = async (id, password) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/users/resetpass/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!res.ok) return res.status;
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
