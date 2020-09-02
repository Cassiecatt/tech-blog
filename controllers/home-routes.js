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

router.get("/post/:id", (req, res) => {
  Post.findOne(req.params.id, {
    where: {
      id: req.params.id
    },
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single", { post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


//get route - login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//get route - signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
