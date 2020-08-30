const router = require('express').Router(); //express

const userRoutes = require('./user-routes'); // user routes
const postRoutes = require('./post-routes'); // post routes
const commentRoutes = require('./comment-routes'); // comment routes

router.use('/users', userRoutes); // prefixing route with /users path
router.use('/posts', postRoutes); // prefixing route with /posts path
router.use('/comments', commentRoutes); // prefixing route with /comments path

module.exports = router;