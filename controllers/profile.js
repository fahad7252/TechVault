const express = require("express");
const router = express.Router();
const ensureSignedIn = require("../middleware/ensure-signed-in");

// GET /profile
router.get("/", ensureSignedIn, (req, res) => {
  res.render("profile", {
    title: "Profile",
    user: req.user,
  });
});

module.exports = router;
