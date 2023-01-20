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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user.followers.includes(currentUser.id)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json(`You have started following ${user.username}.`);
    } else {
      res.status(403).json(`You already follow ${user.username}.`);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
});

//UNFOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (user.followers.includes(currentUser.id)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json(`You have unfollowed ${user.username}.`);
    } else {
      res.status(403).json(`You don't follow ${user.username}.`);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
});

module.exports = router;
