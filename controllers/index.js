const router = require('express').Router(); // express

const apiRoutes = require('./api'); // all api routes

router.use('/api', apiRoutes);

module.exports = router;