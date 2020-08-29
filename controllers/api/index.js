const router = require('express').Router(); //express
const userRoutes = require('./user-routes'); // user routes

router.use('/users', userRoutes); // prefixing route with /user path

module.exports = router;