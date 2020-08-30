const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

//get route - all posts on homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "body", "created_at"],
    include: [User],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get route - login page
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
