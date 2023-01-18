const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//UPDATE USER
router.put("/:id", async (req, res) => {
  const queriedUser = await User.findById(req.params.id);
  if (req.body.userId === req.params.id || queriedUser.isAdmin) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
    } catch (error) {
      res.status(500).json(error.messsage);
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(400).json({
        message: "You Account has been Updated",
        data: user,
      });
    } catch (error) {
      res.status(404).json(error.messsage);
    }
  } else {
    res.status(403).json("You can update your account only.");
  }
});

//DELETE A USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(400).json({
        message: "You Account has been Deleted",
        data: user,
      });
    } catch (error) {
      res.status(404).json(error.messsage);
    }
  } else {
    res.status(403).json("You can Delete your account only.");
  }
});
//GET A USER
//UNFOLLOW A USER

module.exports = router;
