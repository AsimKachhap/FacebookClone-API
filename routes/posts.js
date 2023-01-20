const router = require("express").Router();
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
//DELETE A POST
//LOKE A POST
//GET A POST
//GET TIMELINE POSTS

module.exports = router;
