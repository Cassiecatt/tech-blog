const router = require('express').Router(); // express

const apiRoutes = require('./api'); // all api routes
const homeRoutes = require('./home-routes'); // home routes
const dashboardRoutes = require('./dashboard-routes.js'); // dashboard routes

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;