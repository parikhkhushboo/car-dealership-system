const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
  searchVehicles
} = require('../controllers/vehicleController');

// 🟢 PUBLIC ROUTES
router.get('/', getVehicles);
router.get('/search', searchVehicles);

// 🟡 USER ROUTES (Logged in users)
router.post('/:id/purchase', auth, purchaseVehicle);

// 🔴 ADMIN ONLY ROUTES
router.post('/', auth, admin, addVehicle);
router.put('/:id', auth, admin, updateVehicle);
router.delete('/:id', auth, admin, deleteVehicle);
router.post('/:id/restock', auth, admin, restockVehicle);

module.exports = router;