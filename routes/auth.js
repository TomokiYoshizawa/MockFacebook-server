const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("auth Router");
});

module.exports = router;
