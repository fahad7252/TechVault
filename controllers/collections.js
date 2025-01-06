const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");

// List all collections
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id });
    res.render("collections/index", {
      title: "My Collections",
      collections,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// New collection form
router.get("/new", (req, res) => {
  res.render("collections/new", {
    title: "Add Collection",
  });
});

//Create new collection
router.post("/", async (req, res) => {
  console.log("POST Request Body:", req.body);
  console.log("Logged in user:", req.user);
  try {
    const collection = await Collection.create({
      device: {
        name: req.body.name,
        type: req.body.type,
        brand: req.body.brand,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        images: req.body.images ? req.body.images.split(",") : [],
        memories: req.body.memories ? req.body.memories.split(",") : [],
      },
      user: req.user._id,
    });
    console.log("Created collection:", collection);
    res.redirect("/collections");
  } catch (err) {
    console.log("Error creating collection:", err);
    res.redirect("/collections/new");
  }
});

// Show collection details
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.render("collections/show", {
      title: collection.device.name,
      collection,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/collections");
  }
});

// Edit collection form
router.get("/:id/edit", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.render("collections/edit", {
      title: "Edit Collection",
      collection,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/collections");
  }
});
// update
router.put("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    collection.set(req.body);
    await collection.save();
    res.redirect(`/collections`);
  } catch (err) {
    console.log(err);
    res.redirect(`/collections/${req.params.id}/edit`);
  }
});

// Delete collection
router.delete("/:id", async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.redirect("/collections");
  } catch (err) {
    console.log(err);
    res.redirect("/collections");
  }
});

module.exports = router;
