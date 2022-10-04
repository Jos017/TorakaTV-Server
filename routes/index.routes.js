const router = require("express").Router();
const authRoutes = require("./auth.routes");
const movieRoutes = require("./movie.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({
    developer: "Jose Rios",
    country: "Bolivia",
  });
});

router.use("/auth", authRoutes);
router.use("/movie", movieRoutes);

module.exports = router;
