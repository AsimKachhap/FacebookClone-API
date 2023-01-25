const router = require("express").Router();
const { findById } = require("../models/Post");
const Post = require("../models/Post");

//CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await Post.create(newPost);
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//UPDATE A POST
router.put("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const currentPost = await Post.findById(req.params.id);
    console.log(currentPost);
    if (currentPost.userId === req.body.userId) {
      await currentPost.updateOne({ $set: req.body });
      res.status(200).json("You have successfully updated your Post");
    } else {
      res.status(403).json("You can update your post only.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const currentPost = await Post.findById(req.params.id);
    console.log(currentPost);
    if (currentPost.userId === req.body.userId) {
      await currentPost.deleteOne({ $set: req.body });
      res.status(200).json("You have successfully deleted your Post");
    } else {
      res.status(403).json("You can delete your post only.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//LIKE OR DISLIKE A POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.update({ $push: { likes: req.body.userId } });
      res.status(200).json("You have liked the post.");
    } else {
      await post.update({ $pull: { likes: req.body.userId } });
      res.status(200).json("You have disliked the post.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET A POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//GET TIMELINE POSTS

module.exports = router;
