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

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    const password = user[0].password;
    if (user.length == 1) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (validPassword) {
        res.status(200).json("You ae Loged In");
      } else {
        res.status(404).json("Wrong Password");
      }
    } else {
      res.status(404).json("User doesn't Exists.");
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
