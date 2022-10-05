const router = require("express").Router();
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

// Create a movie comment
router.post("/:tmdbId/comments", (req, res, next) => {
  const { tmdbId } = req.params;
  const { description, userId } = req.body;
  Comment.create({ description, tmdbId, user: userId })
    .then((comment) => {
      console.log(comment);
      Comment.findById(comment.id)
        .populate("user", "username")
        .then((newComment) => {
          User.findByIdAndUpdate(
            userId,
            {
              $push: { comments: newComment._id },
            },
            { new: true }
          )
            .then(() => res.json(newComment))
            .catch((err) => res.json(err));
        });
    })
    .catch((err) => res.json(err));
});

// Read comments per movie
router.get("/:tmdbId/comments/", (req, res, next) => {
  const { tmdbId } = req.params;
  Comment.find({ tmdbId: tmdbId })
    .populate("user", "username")
    .then((movieComments) => res.json(movieComments))
    .catch((err) => res.json(err));
});

// Read all comments
router.get("/comments", (req, res, next) => {
  Comment.find()
    .then((allComments) => res.json(allComments))
    .catch((err) => res.json(err));
});

router.put("/comments/update", (req, res, next) => {
  const { description, commentId } = req.body;
  Comment.findByIdAndUpdate(commentId, { description }, { new: true })
    .populate("user", "username")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Delete a comment
router.delete("/comments/delete/:commentId", (req, res, next) => {
  const { commentId } = req.params;
  Comment.findByIdAndDelete(commentId).then((deletedComment) => {
    return User.findByIdAndUpdate(
      deletedComment.user,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    )
      .then(() => res.json(deletedComment))
      .catch((err) => res.json(err));
  });
});

module.exports = router;
