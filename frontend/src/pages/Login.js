import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log(res.data);

      if (res && res.data) {

        // ✅ Save token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        // ✅ Save role (important for admin check)
        if (res.data.user) {
          localStorage.setItem("role", res.data.user.role);
        }

        alert("Login Successful");

        navigate("/vehicles");

      }

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.msg ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-4 text-center">
        Login
      </h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

    </div>

  );
}

export default Login;