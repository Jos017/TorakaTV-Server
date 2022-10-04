const router = require("express").Router();
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

// Create a movie comment
router.post("/:tmdbId/comments", (req, res, next) => {
  const { tmdbId } = req.params;
  const { description, userId } = req.body;
  Comment.create({ description, tmdbId, user: userId }).then((newComment) => {
    return User.findByIdAndUpdate(
      userId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    )
      .then(() => res.json(newComment))
      .catch((err) => res.json(err));
  });
});

// Read comments per movie
router.get("/:tmdbId/comments/", (req, res, next) => {
  const { tmdbId } = req.params;
  Comment.find({ tmdbId: tmdbId })
    .then((movieComments) => {
      movieComments.length
        ? res.json(movieComments)
        : res.json(
            "There is no comment for this movie at this moment, try again later"
          );
    })
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
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Delete a comment
router.delete("/comments/delete", (req, res, next) => {
  const { commentId, userId } = req.body;
  Comment.findByIdAndDelete(commentId).then(() => {
    return User.findByIdAndUpdate(
      userId,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    )
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });
});

module.exports = router;
