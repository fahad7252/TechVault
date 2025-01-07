const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");

// GET /posts - show other users' collections
router.get("/", async (req, res) => {
  try {
    // Find collections not belonging to current user
    const collections = await Collection.find({ user: { $ne: req.user._id } })
      .populate("user", "username")
      .sort("-createdAt");

    res.render("posts/index", {
      title: "Community Collections",
      collections,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate("user", "username")
      .populate("comments.user", "username");

    res.render("posts/show", {
      title: collection.device.name,
      collection,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
});

// POST /posts/:id/likes - toggle like on collection
router.post("/:id/likes", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    // Find if user already liked this collection
    const hasLiked =
      collection.likes &&
      collection.likes.some(
        (like) => like.toString() === req.user._id.toString()
      );

    if (hasLiked) {
      // Unlike: remove user's ID from likes array
      collection.likes = collection.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like: add user's ID to likes array
      if (!collection.likes) collection.likes = [];
      collection.likes.push(req.user._id);
    }

    await collection.save();
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
});

// POST /posts/:id/comments - add comment to collection
router.post("/:id/comments", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    // Add new comment
    if (!collection.comments) collection.comments = [];
    collection.comments.push({
      text: req.body.text,
      user: req.user._id,
    });

    await collection.save();
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate("user", "username")
      .populate("comments.user", "username")
      .populate("likes");

    res.render("posts/show", {
      title: collection.device.name,
      collection,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
});

module.exports = router;
