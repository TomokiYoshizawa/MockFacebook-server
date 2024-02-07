const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("post Router");
});

module.exports = router;
