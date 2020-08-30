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

//post route - user login
router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user found with that username!' });
        return;
      }
  
      const password = dbUserData.checkPassword(req.body.password);
  
      if (!password) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

module.exports = router;
