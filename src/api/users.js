export const Login = async (user) => {
  const res = await fetch("https://techdome-test-server.vercel.app", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Use doesn't exist");
  const data = await res.text();
  localStorage.setItem("token", data);
  return data;
};

export const Logout = () => {
  localStorage.removeItem("token");
  return;
};
