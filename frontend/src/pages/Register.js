import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    // ✅ Validation
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/register", user);

      alert(res.data.msg || "Registration successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.msg ||
        "Register failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-xl">

      <h2 className="text-2xl font-bold mb-4 text-center">
        Register
      </h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />

      <input
        type="password"
        className="w-full border p-2 mb-3 rounded"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading
            ? "bg-gray-400"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>

    </div>

  );
}

export default Register;