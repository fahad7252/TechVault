const express = require("express");
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
