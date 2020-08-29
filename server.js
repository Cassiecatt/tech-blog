const express = require('express'); // require express
const routes = require('./controllers'); // require all routes in folder
const sequelize = require('./config/connection') // connection to server

const app = express();
const PORT = process.env.PORT || 3001; // heroku

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//turn on routes
app.use(routes);

//turn on connection to db and server - .sync() means sequelize is taking the models and connection them to associate db tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});