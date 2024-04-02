module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Sasha',
        username: 'admin',
        orders: undefined,
        role: 'boss',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dima',
        username: 'dm',
        orders: [2],
        role: 'waiter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vania',
        username: 'vn',
        orders: [1],
        role: 'waiter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rita',
        username: 'rt',
        orders: undefined,
        role: 'first mate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
