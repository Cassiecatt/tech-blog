const Sequelize = require('sequelize'); // sequelize
require('dotenv').config(); //.env

//connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'locahost',
    dialect: 'mysql',
    port: 3001
});

module.exports = sequelize;