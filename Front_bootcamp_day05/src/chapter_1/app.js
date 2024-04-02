const express = require('express');
const serverRoutes = require('./api/routes');
const path = require('path');
const hbs = require('hbs');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(`${__dirname}/views/`, (err) => {
  console.log(err);
});

serverRoutes(app);

app.listen(PORT, async () => {
  console.log(`Прослушивание порта ${PORT}`);
});

