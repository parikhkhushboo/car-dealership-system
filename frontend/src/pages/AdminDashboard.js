import { Link } from "react-router-dom";

function AdminDashboard() {

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h2>

      <Link
        to="/add"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Vehicle
      </Link>

    </div>
  );
}

export default AdminDashboard;