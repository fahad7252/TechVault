/*const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET /users/:id - show user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("users/show", {
      title: user.username,
      user,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Collection = require("../models/collection");

// GET /users/:id - show user profile and collections
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const collections = await Collection.find({ user: req.params.id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("users/show", {
      title: user.username,
      profileUser: user,
      collections,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
