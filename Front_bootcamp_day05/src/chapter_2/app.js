const exphbs = require('express-handlebars');
const { join, resolve } = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { json, static } = express;
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express()
  .use(json())
  .use(static(resolve(__dirname, 'public')))
  .use(cors())
  .use(cookieParser())
  .use(express.urlencoded({ extended: false }));

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
const paths = ['/', '/menu', '/orders'];
paths.forEach((sitePath) => {
  app.get(sitePath, (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/signin');
    }
    next();
  });
});

app.use('/', require('./api/routes/main.routes'));
app.use('/orders', require('./api/routes/orders.routes'));
app.use('/menu', require('./api/routes/menu.routes'));
app.use('/signin', require('./api/routes/signin.routes'));
app.use('/signup', require('./api/routes/signup.routes'));
app.use('/logout', require('./api/routes/logout.routes'));

app.use('/api/users', require('./api/routes/user.routes'));
app.use('/api/orders', require('./api/routes/orders.routes'));
app.use('/api/waiters', require('./api/routes/waiter.routes'));
app.use('/api/menu', require('./api/routes/menuitem.routes'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
