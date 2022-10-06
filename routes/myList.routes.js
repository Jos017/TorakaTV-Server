const router = require("express").Router();
const ListItem = require("../models/ListItem.model");
const User = require("../models/User.model");

//Add an item to the watching list
router.post("/:tmdbId/add", (req, res, next) => {
  const { tmdbId } = req.params;
  const {
    title,
    categories,
    status,
    progress,
    ranking,
    userId,
    totalProgress,
    img,
  } = req.body;
  ListItem.create({
    title,
    categories,
    status,
    tmdbId,
    progress,
    totalProgress,
    ranking,
    img,
    user: userId,
  })
    .then((item) => {
      ListItem.findById(item.id)
        .populate("user", "username")
        .then((newItem) => {
          User.findByIdAndUpdate(
            userId,
            {
              $push: { list: newItem._id },
            },
            { new: true }
          )
            .then(() => res.json(newItem))
            .catch((err) => res.json(err));
        });
    })
    .catch((err) => res.json(err));
});

// Obtain all items in the watching list
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  ListItem.find({ user: userId })
    .then((allItems) => res.json(allItems))
    .catch((err) => res.json(err));
});

router.put("/update/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  const { status, progress } = req.body;
  ListItem.findByIdAndUpdate(itemId, { status, progress }, { new: true })
    .populate("user", "username")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Delete a list item
router.delete("/delete/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  ListItem.findByIdAndDelete(itemId).then((deletedItem) => {
    return User.findByIdAndUpdate(
      deletedItem.user,
      {
        $pull: { list: itemId },
      },
      { new: true }
    )
      .then(() => res.json(deletedItem))
      .catch((err) => res.json(err));
  });
});

module.exports = router;
