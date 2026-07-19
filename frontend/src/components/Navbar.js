import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">

      <div className="flex justify-between max-w-7xl mx-auto">

        <h1 className="font-bold">🚗 Car Dealer</h1>

        <div className="space-x-4">

          <Link to="/vehicles">Vehicles</Link>

          {role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}

          {token && role !== "admin" && (
            <Link to="/user">Dashboard</Link>
          )}

          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {token && (
            <button onClick={logout}>
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;