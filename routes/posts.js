const router = require("express").Router();
const Post = require("../models/postModel");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//edit a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("You have edited your post");
    } else {
      return res.status(403).json("This is not your post");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("You have deleted your post");
    } else {
      return res.status(403).json("This is not your post");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//get a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//like posts
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // you can like a post if you have not liked it before
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("You liked this post");
      // you can unlike a post if you have liked it before. (remove the 'userId')
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(403).json("You unliked this post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get timeline posts

module.exports = router;
