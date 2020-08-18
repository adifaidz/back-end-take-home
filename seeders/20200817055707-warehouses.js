'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface
    let warehouses = [];

    for (let id = 1; id <= 5; id++) {
      warehouses.push({
        name: faker.address.city(),
        desc: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('warehouses', warehouses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('warehouses', null, {});
  }
};
