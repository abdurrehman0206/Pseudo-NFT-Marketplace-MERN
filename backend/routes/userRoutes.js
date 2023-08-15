const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyToken,
  getUsers,
  getArtist,
} = require("../controller/userController");
router.get("/verify", verifyToken);
router.post("/signup", signup);
router.post("/login", login);
router.get("/all", getUsers);
router.get("/artist/:id", getArtist);

module.exports = router;
