import jwt_decode from "jwt-decode";

export const register = async (user) => {
  try {
    const res = await fetch(`http://localhost:5000/users/register`, {
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
    const res = await fetch(`http://localhost:5000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
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
  let isAuth = localStorage.getItem("token") ? true : false;
  let user = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;

  let isAdmin = user && user.data.isAdmin ? true : false;
  return { isAuth, user, isAdmin };
};

export const getUser = async () => {
  try {
    const res = await fetch(`http://localhost:5000/users/single`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
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

export const getUsers = async (filters) => {
  try {
    const res = await fetch(`http://localhost:5000/users/`, {
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
    const res = await fetch(`http://localhost:5000/users/role`, {
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
  console.log(id);
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
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

    const res = await fetch(`http://localhost:5000/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();
    if (res.ok) return data;
    else return data.msg;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUser = async (user) => {
  console.log(JSON.stringify(user));
  try {
    const res = await fetch("http://localhost:5000/users/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) return data;
    else return data.message;
  } catch (e) {
    throw new Error(e);
  }
};

export const updatePassword = async (pass) => {
  try {
    const res = await fetch("http://localhost:5000/users/pass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(pass),
    });

    const data = await res.json();
    if (res.ok) return data;
    else return data.message;
  } catch (e) {
    throw new Error();
  }
};

export const getWithToken = async (token) => {
  try {
    const res = await fetch(`http://localhost:5000/users/token/${token}`);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const sendResetEmail = async (email) => {
  try {
    const findUser = await fetch("http://localhost:5000/users/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (findUser.status === 404) return 404;

    const res = await fetch("http://localhost:5000/users/reset", {
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
      `http://localhost:5000/users/resetpass/636e4a4f5863ebbd3b549583`,
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
