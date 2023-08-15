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
} = require("../controller/nftController");

router.use(requireAuth);
router.post("/", createNFT);
router.get("/", getNFTs);
router.get("/:id", getNFT);
router.put("/:id", updateNFT);
router.put("/:id/addToCart", addToCartNFT);
router.put("/:id/removeFromCart", removeFromCartNFT);
router.delete("/:id", deleteNFT);

module.exports = router;
 