'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const argon2 = require('argon2');
    const data = [
      {type: 'Sedan', color: 'red', aliasId: await argon2.hash('1')},
      {type: 'hatchback', color: 'blue', aliasId: await argon2.hash('2')},
      {type: 'hatchback', color: 'green', aliasId: await argon2.hash('3')},
      {type: 'suv', color: 'yellow', aliasId: await argon2.hash('4')},
      {type: 'suv', color: 'orange', aliasId: await argon2.hash('5')},
      {type: 'sports', color: 'black', aliasId: await argon2.hash('6')},
      {type: 'tourer', color: 'white', aliasId: await argon2.hash('7')},
    ];
    await queryInterface.bulkInsert('vehicles', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('vehicles', null, {});
  }
};
