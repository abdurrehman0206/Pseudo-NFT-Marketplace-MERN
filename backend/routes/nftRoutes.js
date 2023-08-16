const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createNFT,
  getNFTs,
  getNFT,
  updateNFT,
  deleteNFT,
  addToCartNFT,
  removeFromCartNFT,
  likeNFT,
} = require("../controller/nftController");

router.use(requireAuth);
router.post("/", createNFT);
router.get("/", getNFTs);
router.get("/:id", getNFT);
router.put("/:id", updateNFT);
router.patch("/:id/addToCart", addToCartNFT);
router.patch("/:id/removeFromCart", removeFromCartNFT);
router.patch("/:id/like", likeNFT);
router.delete("/:id", deleteNFT);

module.exports = router;
