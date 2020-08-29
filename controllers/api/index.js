const router = require('express').Router(); //express

const userRoutes = require('./user-routes'); // user routes
const postRoutes = require('./post-routes'); // post routes

router.use('/users', userRoutes); // prefixing route with /users path
router.use('/posts', postRoutes); // prefixing route with /posts path

module.exports = router;