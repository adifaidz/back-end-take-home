'use strict';
const {Warehouse, Product} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface
    let records = [];

    let warehouses = await Warehouse.findAll();
    let products = await Product.findAll();

    warehouses.forEach(warehouse => {
      products.forEach(product => {
        records.push({
          warehouseId: warehouse.id,
          productId: product.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
    });

    await queryInterface.bulkInsert('warehouseproducts', records);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('warehouseproducts', null, {});
  }
};
