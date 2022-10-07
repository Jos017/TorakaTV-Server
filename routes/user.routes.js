const router = require("express").Router();
const User = require("../models/User.model");

router.put("/edit", (req, res, next) => {
  const { userId, username, firstName, lastName, email, phone, about, avatar } =
    req.body;
  User.findByIdAndUpdate(
    userId,
    { username, firstName, lastName, email, phone, about, avatar },
    { new: true }
  )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
