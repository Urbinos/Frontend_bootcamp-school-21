'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          username: 'admin',
          password:
            '$2b$10$yeyfq5Swk8Z6TGx6ArDG0uqWjybrbLUVJ/baDYWZV.Ly40n3D89fu', // admin
          orders: undefined,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'John Doe',
          username: 'jd',
          password:
            '$2b$10$1X40A6VT82UrinjQOXcEh.wyq8UogQYswH83VUHqwvAEG/cX3IHIW', // jd
          orders: [2],
          role: 'waiter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Doe',
          username: 'jn',
          password:
            '$2b$10$y0LzOEKIx7wMCaDtIylXKOBjFpaPQadidTf4cngbz4NYl9.EgDGXW', // jn
          orders: [1],
          role: 'waiter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
