const router = require("express").Router(); // express
const { User, Post, Comment } = require("../../models"); // require files in model folder

//==================== user get routes for testing ===========
//Get Route - /api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get Route - /api/users/id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_body", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//==================== user get routes for testing ===========

//Post Route - /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.sessions.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
  // .then((dbUserData) => res.json(dbUserData))
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});

//Post Route - /api/users/login
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

//Delete Route - /api/users/id
router.delete("/:id", (req, res) => {
  User.destroy()({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
