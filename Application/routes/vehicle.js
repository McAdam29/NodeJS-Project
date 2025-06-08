const express = require('express');
const router = express.Router();
const vehicleService = require('../services/vehicleService');

router.post('/createVehicle', async (req, res) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).send({
            message: 'Vehicle created successfully',
            vehicle: vehicle
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error creating vehicle',
            error: error.message
        });
    }
});

router.get('/getVehicles', async (req, res) => {
    try {
        const vehicles = await vehicleService.getVehicles();
        res.status(200).send({
            message: 'Vehicles retrieved successfully',
            vehicles: vehicles
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving vehicles',
            error: error.message
        });
    }
});
router.get('/getVehicle/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id || null;
        if (!vehicleId) {
            return res.status(401).send({
                message: 'Vehicle ID is required'
            });
        }
        const vehicle = await vehicleService.getVehicleById(vehicleId);
        if (!vehicle) {
            return res.status(404).send({
                message: 'Vehicle not found'
            });
        }
        res.status(200).send({
            message: 'Vehicle retrieved successfully',
            vehicle: vehicle
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving vehicle',
            error: error.message
        });
    }
});

module.exports = router;
