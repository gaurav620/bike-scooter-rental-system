const express = require('express');
const { addVehicle, getVehicles, updateVehicleStatus } = require('../controllers/vehicleController');

const router = express.Router();

router.post('/', addVehicle);
router.get('/', getVehicles);
router.put('/:id', updateVehicleStatus);

module.exports = router;