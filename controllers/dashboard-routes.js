const router = require("express").Router();
const { Post } = require("../models/");

//get route - /dashboard, should show all posts associated with user
router.get("/", (req, res) => {
    console.log(req.session);
    Post.findAll({
        where: {
            user_id: req.session.userId
        }
    })
    .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true}));

        res.render("admin", {
            layout: "dashboard",
            posts
        });
    })
    .catch(err => {
        console.log(err);
        res.redirect("login");
    });
});

router.get("/new", (req, res) => {
    res.render("new-post", {
      layout: "dashboard"
    });
  });

//   router.put("/edit/:id", (req, res) => {
//     Post.update(
//       {
//         title: req.body.title,
//         body: req.body.body,
//       },
//       {
//         where: {
//           post_id: req.params.post_id,
//         },
//       }
//     )
//       .then((dbPostData) => {
//         if (dbPostData) {
//           const post = dbPostData.get({ plain: true });
//           res.render("edit-post", {
//               layout: "dashboard",
//               post
//           })
//         } else {
//         res.status(404).json({ message: "No post found with that id" });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

router.get("/edit/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(dbPostData => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
          
          res.render("edit-post", {
            layout: "dashboard",
            post
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });



module.exports = router;