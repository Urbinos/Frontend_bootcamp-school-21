'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'MenuItems',
      [
        {
          title: 'Pasta',
          picture: 'pasta.png',
          cost: 400,
          callQuantity: 10,
          description: 'This is pasta',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pizza',
          picture: 'pizza.png',
          cost: 700,
          callQuantity: 8,
          description: 'This is pizza',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Burger',
          picture: 'burger.png',
          cost: 200,
          callQuantity: 5,
          description: 'This is burger',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Salad',
          picture: 'salad.png',
          cost: 300,
          callQuantity: 3,
          description: 'This is ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuItems', null, {});
  },
};
