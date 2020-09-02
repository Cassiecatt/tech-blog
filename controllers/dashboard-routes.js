const router = require("express").Router();
const { Post } = require("../models/");

//get route - /dashboard, should show all posts associated with user
router.get("/", (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
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



module.exports = router;