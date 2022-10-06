const router = require("express").Router();
const Comment = require("../models/Comment.model");
const Ranking = require("../models/Ranking.model");
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

// Update a comment
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

// Create a ranking
router.post("/:movieId/ranking/", (req, res, next) => {
  const { movieId } = req.params;
  const { rank, userId } = req.body;
  Ranking.create({ rank, tmdbId: movieId, user: userId })
    .then((newRank) => {
      console.log(newRank);
      Ranking.findById(newRank.id)
        .populate("user", "username")
        .then((newRanking) => {
          User.findByIdAndUpdate(
            userId,
            {
              $push: { ranking: newRanking._id },
            },
            { new: true }
          )
            .then(() => res.json(newRanking))
            .catch((err) => res.json(err));
        });
    })
    .catch((err) => res.json(err));
});

// Read Ranking per movie and user
router.get("/:tmdbId/ranking/:userId", (req, res, next) => {
  const { tmdbId, userId } = req.params;
  Ranking.find({ tmdbId: tmdbId, user: userId })
    .populate("user", "username")
    .then((yourRank) => res.json(yourRank))
    .catch((err) => res.json(err));
});

// Update a ranking
router.put("/ranking/update/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  const { rank } = req.body;
  Ranking.findByIdAndUpdate(itemId, { rank }, { new: true })
    .populate("user", "username")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
