'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let products = [];
    
    for (let id = 1; id <= 100; id++) {
      products.push({
        name: faker.commerce.productName(),
        desc: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('products', products);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
