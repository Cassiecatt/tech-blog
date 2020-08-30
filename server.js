const path = require('path');
const express = require('express'); // require express
const routes = require('./controllers'); // require all routes in folder
const sequelize = require('./config/connection') // connection to server

//handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001; // heroku

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); // middleware that takes contents of a folder and serves them as static assets


//turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turn on connection to db and server - .sync() means sequelize is taking the models and connection them to associate db tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});