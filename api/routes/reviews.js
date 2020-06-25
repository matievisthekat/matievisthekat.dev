const router = require("express").Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.send(reviews);
});

module.exports = router;
