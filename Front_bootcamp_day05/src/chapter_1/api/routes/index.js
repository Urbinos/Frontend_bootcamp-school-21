const userRoutes = require('./user.routes');
const waiterRoutes = require('./waiter.routes');
const orderRoutes = require('./order.routes');
const menuItemRoutes = require('./menuitem.routes');

const viewRoutes = require('./view.routes');

module.exports = function initRoutes(app) {
  app.use('/api/users', userRoutes);
  app.use('/api/waiters', waiterRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/menu', menuItemRoutes);

  app.use('/', viewRoutes);
};
