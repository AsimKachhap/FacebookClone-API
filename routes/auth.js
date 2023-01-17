const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    // HASHING THE PASSWORD
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATING NEW USER
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //SAVING THE NEW USER
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
