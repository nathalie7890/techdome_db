export const Login = async(user) => {
    const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user)
    })
    //if(!res.ok) throw new Error("Use doesn't exist")
    const data = await res.text()
    localStorage.setItem("token", data);
    return data
}

export const Logout = () => {
  localStorage.removeItem("token")
  return
}