const express = require('express');
const db = require('./models/index.js');
const serverRoutes = require('./routes/router.js');

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(serverRoutes);

(async () => {
    await db.sequelize.sync();
})();

app.listen(PORT, async () => {
    console.log('Server is listening on port ${PORT}...');
    await db.sequelize.authenticate();
    console.log('Database successfully connected.');
});

