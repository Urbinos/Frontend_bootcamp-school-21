'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          userId: 1,
          isActive: true,
          items: [1, 3],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          isActive: true,
          items: [2, 4],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
