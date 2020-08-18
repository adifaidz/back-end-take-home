'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let users = []

    for (let id = 1; id <= 100; id++) {
      users.push({
        email: faker.internet.email(),
        password: await bcrypt.hash('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
