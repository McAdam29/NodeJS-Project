const express = require('express');
const router = express.Router();
const rentService = require('../services/rentService');

router.post('/bookRent', async (req, res) => {
    try {
        const rent = await rentService.bookRent(req.body);
        res.status(201).send({
            message: 'Rent booking created successfully',
            rent: rent
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error creating rent booking',
            error: error.message
        });
    }
});

router.get('/getRents', async (req, res) => {
    try {
        const rents = await rentService.getAllRents();
        res.status(200).send({
            message: 'Rent bookings retrieved successfully',
            rents: rents
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving rent bookings',
            error: error.message
        });
    }
});

router.get('/getRent/:id', async (req, res) => {
    try {
        const rentId = req.params.id || null;
        if (!rentId) {
            return res.status(401).send({
                message: 'Rent ID is required'
            });
        }
        const rent = await rentService.getRentById(rentId);
        if (!rent) {
            return res.status(404).send({
                message: 'Rent booking not found'
            });
        }
        res.status(200).send({
            message: 'Rent booking retrieved successfully',
            rent: rent
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving rent booking',
            error: error.message
        });
    }
});

module.exports = router;
