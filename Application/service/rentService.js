const { Rent } = require('../models');

class RentService {
  /**
   * Function to book vehicle rent without overlapping the dates
   * @param {number} vehicleId - The id of the vehicle to be rented
   * @param {Date} startDate - The start date of the rent
   * @param {Date} endDate - The end date of the rent
   * @returns {Promise<Rent>} - The created rent object
   */
  async bookRent(vehicleId, startDate, endDate) {
    const existingRent = await Rent.findOne({
      where: {
        vehicleId,
        $or: [
          {
            startDate: {
              [Op.lte]: endDate,
            },
            endDate: {
              [Op.gte]: startDate,
            },
          },
        ],
      },
    });
    if (existingRent) {
      throw new Error('Vehicle is already rented for the given dates');
    }
    return Rent.create({ vehicleId, startDate, endDate });
  }

    /**
     * Function to get all rents
     * @returns {Promise<Array<Rent>>} - List of all rents
     */
    async getAllRents() {
        try {
            const rents = await Rent.findAll({
                attributes: ['id', 'vehicleId', 'startDate', 'endDate', 'status'],
                where: {
                    status: 'active'
                },
                include: [{
                    model: Vehicle,
                    as: 'vehicle',
                    attributes: ['aliasId', 'type', 'color']
                }],
            });
            return rents;
        } catch (error) {
            throw new Error(`Error retrieving rents: ${error.message}`);
        }
    }

    /**
     * Function to get rent by ID
     * @param {number} rentId - The id of the rent to be retrieved
     * @returns {Promise<Rent>} - The rent object
     */
    async getRentById(rentId) {
        if (!rentId) {
            throw new Error('Rent ID is required');
        }
        try {
            const rent = await Rent.findOne({
                where: { id: rentId },
                include: [{
                    model: Vehicle,
                    as: 'vehicle',
                    attributes: ['aliasId', 'type', 'color']
                }],
            });
            if (!rent) {
                throw new Error('Rent not found');
            }
            return rent;
        } catch (error) {
            throw new Error(`Error retrieving rent: ${error.message}`);
        }
    }
}

module.exports = RentService;
