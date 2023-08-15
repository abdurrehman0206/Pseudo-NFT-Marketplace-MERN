const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyToken,
  getUsers,
} = require("../controller/userController");
router.get("/verify", verifyToken);
router.post("/signup", signup);
router.post("/login", login);

router.get("/all", getUsers);

module.exports = router;
