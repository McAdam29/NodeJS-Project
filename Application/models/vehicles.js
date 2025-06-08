const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vin: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aliasId: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'vehicles',
    timestamps: true
});

// Define associations here
Vehicle.associate = function(models) {
    // Example association
    Vehicle.hasMany(models.Rent, {
        foreignKey: 'vehicleId',
        as: 'rents',
        sourceKey: 'aliasId'
    });
};

module.exports = Vehicle;

