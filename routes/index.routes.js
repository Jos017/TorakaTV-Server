const router = require("express").Router();
const authRoutes = require("./auth.routes");
const movieRoutes = require("./movie.routes");
const myListRoutes = require("./myList.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({
    developer: "Jose Rios",
    country: "Bolivia",
  });
});

router.use("/auth", authRoutes);
router.use("/movie", movieRoutes);
router.use("/myList", myListRoutes);

module.exports = router;
