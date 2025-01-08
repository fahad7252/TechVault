const express = require("express");
const router = express.Router();
const ensureSignedIn = require("../middleware/ensure-signed-in");
const User = require("../models/user");
// GET /profile
router.get("/", ensureSignedIn, (req, res) => {
  res.render("profile", {
    title: "Profile",
    user: req.user,
  });
});

// Edit collection form
router.get("/:id/edit", ensureSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("profile/edit", {
      title: "Edit profile",
      user,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/profile");
  }
});
// Update profile
router.put("/:id", ensureSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.username = req.body.username;
    user.details = req.body;
    await user.save();
    res.redirect(`/profile`);
  } catch (err) {
    console.log(err);
    res.redirect(`/profile/${req.params.id}/edit`);
  }
});

module.exports = router;
