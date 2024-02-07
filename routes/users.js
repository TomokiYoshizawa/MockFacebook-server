const router = require("express").Router();
const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("User Router");
});

//register user
router.post("/register", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
