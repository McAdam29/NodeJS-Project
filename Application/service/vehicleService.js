const { argon2d } = require("argon2");
import Vehicle from "../models/vehicles.js"; // Adjust the import path as necessary

class VehicleService {
    async createVehicle(vehicleDetails) {
        const {type, color } = vehicleDetails;
        if (!type || !color) {
            throw new Error('Required details are missing');
        }
        const vehicle = await Vehicle.create({
            type,
            color,
        }).then(async (vehicle) => {
            if (!vehicle.id) {
                throw new Error('Vehicle creation failed');
            } else {
                vehicle.aliasId = await argon2d.hash(vehicle.id);
                return vehicle.save();
            }
        }).catch((error) => {
            throw new Error(`Error creating vehicle: ${error.message}`);
        });
        return vehicle;
    }

    async getVehicles() {
        try {
            const vehicles = await Vehicle.findAll();
            return vehicles;
        } catch (error) {
            throw new Error(`Error retrieving vehicles: ${error.message}`);
        }
    }

    async getVehicleById(vehicleId) {
        if (!vehicleId) {
            throw new Error('Vehicle ID is required');
        }
        try {
            const vehicle = await Vehicle.findOne({
                where: { id: vehicleId }
            });
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }
            return vehicle;
        } catch (error) {
            throw new Error(`Error retrieving vehicle: ${error.message}`);
        }
    }
}

module.exports = VehicleService;
