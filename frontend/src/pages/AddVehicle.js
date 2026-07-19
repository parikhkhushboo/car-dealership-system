import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AddVehicle() {

    const [vehicle, setVehicle] = useState({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });
    };


    const submit = async (e) => {
        e.preventDefault();

        // Validation
        if (!vehicle.make || !vehicle.model || !vehicle.price || !vehicle.quantity) {
            alert("Please fill all required fields");
            return;
        }

        if (vehicle.price <= 0 || vehicle.quantity < 0) {
            alert("Enter valid price and quantity");
            return;
        }

        try {

            setLoading(true);

            const res = await API.post("/vehicles", vehicle);

            alert(res.data.message || "Vehicle Added Successfully");

            // Reset form
            setVehicle({
                make: "",
                model: "",
                category: "",
                price: "",
                quantity: ""
            });

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.msg ||
                "Failed to add vehicle"
            );

        } finally {
            setLoading(false);
        }
    };


    return (

        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4 text-center">
                Add New Vehicle
            </h2>

            <form onSubmit={submit} className="space-y-4">

                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="make"
                    value={vehicle.make}
                    placeholder="Vehicle Make (Toyota, BMW)"
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="model"
                    value={vehicle.model}
                    placeholder="Vehicle Model"
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="category"
                    value={vehicle.category}
                    placeholder="SUV / Sedan / Hatchback"
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="price"
                    type="number"
                    value={vehicle.price}
                    placeholder="Price"
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="quantity"
                    type="number"
                    value={vehicle.quantity}
                    placeholder="Quantity"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${
                        loading
                            ? "bg-gray-400"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Adding..." : "Add Vehicle"}
                </button>

            </form>

        </div>
    );
}

export default AddVehicle;