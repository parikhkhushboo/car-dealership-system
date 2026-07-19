const Vehicle = require('../models/Vehicle');

// ADD VEHICLE
exports.addVehicle = async (req, res) => {
  try {
    const { make, model, price, quantity } = req.body;

    if (!make || !model || !price || !quantity) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (price <= 0 || quantity < 0) {
      return res.status(400).json({ msg: "Invalid values" });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL VEHICLES
exports.getVehicles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const vehicles = await Vehicle.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE VEHICLE
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE VEHICLE
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    res.json({ msg: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PURCHASE VEHICLE
exports.purchaseVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    if (vehicle.quantity <= 0) {
      return res.status(400).json({ msg: "Out of stock" });
    }

    vehicle.quantity -= 1;
    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RESTOCK VEHICLE
exports.restockVehicle = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ msg: "Invalid quantity" });
    }

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    vehicle.quantity += quantity;
    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH + FILTER VEHICLES
exports.searchVehicles = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // Search by make or model
    if (q) {
      filter.$or = [
        { make: { $regex: q, $options: 'i' } },
        { model: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter);

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};