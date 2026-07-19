import React, { useEffect, useState } from "react";
import API from "../services/api";

function Vehicles() {

    // State
    const [vehicles, setVehicles] = useState([]);

    // Load vehicles on page load
    useEffect(() => {
        loadVehicles();
    }, []);

    // Fetch vehicles
    const loadVehicles = async () => {
        try {
            const res = await API.get("/vehicles");
            setVehicles(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Purchase vehicle
    const purchaseVehicle = async (id) => {
        try {
            const res = await API.post(`/vehicles/${id}/purchase`);
            alert(res.data.message || "Purchased Successfully");
            loadVehicles(); // refresh data
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.msg || "Purchase Failed");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <h2 className="text-3xl font-bold text-center mb-6">
                Available Vehicles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle._id}
                        className="bg-white shadow-lg rounded-xl p-5"
                    >

                        <h3 className="text-xl font-semibold">
                            {vehicle.make} {vehicle.model}
                        </h3>

                        <p>Category: {vehicle.category}</p>
                        <p>Price: ₹{vehicle.price}</p>
                        <p>Stock: {vehicle.quantity}</p>

                        <button
                            onClick={() => purchaseVehicle(vehicle._id)}
                            disabled={vehicle.quantity === 0}
                            className={`mt-3 w-full py-2 rounded text-white ${
                                vehicle.quantity === 0
                                    ? "bg-gray-400"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {vehicle.quantity === 0
                                ? "Out of Stock"
                                : "Purchase"}
                        </button>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default Vehicles;