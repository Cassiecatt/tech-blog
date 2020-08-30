const router = require('express').Router(); // express

const apiRoutes = require('./api'); // all api routes
const homeRoutes = require('./home-routes'); // home routes

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;