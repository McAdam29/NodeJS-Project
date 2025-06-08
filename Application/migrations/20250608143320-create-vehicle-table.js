'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('vehicles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      aliasId: {
        type: Sequelize.STRING(255),
        allowNull: false,
        set(value) {
          const argon2 = require('argon2');
          this.setDataValue('aliasId', argon2.hash(this.getDataValue('id')));
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    await queryInterface.addIndex('vehicles', ['aliasId'], {
      unique: true,
      name: 'idx_aliasId'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('vehicles');
  }
};
