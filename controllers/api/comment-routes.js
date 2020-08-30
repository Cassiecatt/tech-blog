const router = require("express").Router();
const { Comment } = require("../../models");

//post route - post a comment
router.post("/", (req, res) => {
  Comment.create({
    comment_body: req.body.comment_body,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;