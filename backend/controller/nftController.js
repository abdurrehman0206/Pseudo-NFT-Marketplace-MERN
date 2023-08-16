const NFT = require("../model/nftModel");
const User = require("../model/userModel");
const mongoose = require("mongoose");

const createNFT = async (req, res) => {
  const { name, desc, image, category, price } = req.body;

  const nft = new NFT({
    name,
    artist: req.user.username,
    desc,
    image,
    category,
    price,
    user_id: req.user.id,
  });
  try {
    const newNFT = await NFT.create(nft);
    const user = await User.findById(req.user.id);
    user.userCollection.push(newNFT._id);
    user.save();
    res.status(201).json({
      success: true,
      message: "NFT created successfully",
      data: newNFT,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NFT creation failed",
      error: error.message,
    });
  }
};
const getNFTs = async (req, res) => {
  try {
    const NFTs = await NFT.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "NFTs fetched successfully",
      data: NFTs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NFTs not found",
      error: error.message,
    });
  }
};
const getNFT = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "NFT not found",
      error: "Invalid Id",
    });
  }
  try {
    const nft = await NFT.findById(id);
    const isViewed = nft.views.find((view) => view === req.user.id);
    if (!isViewed) {
      nft.views.push(req.user.id);
      nft.save();
    }
    res.status(200).json({
      success: true,
      message: "NFT fetched successfully",
      data: nft,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NFT not found",
      error: error.message,
    });
  }
};

const updateNFT = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "NFT not found",
      error: "Invalid Id",
    });
  }
  try {
    const updatedNFT = await NFT.findByIdAndUpdate(
      id,
      {
        _id: id,
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "NFT updated successfully",
      data: updatedNFT,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NFT not found",
      error: error.message,
    });
  }
};
const likeNFT = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "NFT not found",
      error: "Invalid Id",
    });
  }
  try {
    const nft = await NFT.findById(id);
    let alreadyLiked = false;
    if (nft.likes.length > 0) {
      alreadyLiked = nft.likes.find((like) => like === req.user.id);
    }
    if (alreadyLiked) {
      nft.likes = nft.likes.filter((like) => like !== req.user.id);
      nft.save();
      res.status(200).json({
        success: true,
        message: "NFT unliked successfully",
        data: nft,
      });
    } else {
      nft.likes.push(req.user.id);
      nft.save();
      res.status(200).json({
        success: true,
        message: "NFT liked successfully",
        data: nft,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      error: "NFT not found",
      message: error.message,
    });
  }
};
const addToCartNFT = async (req, res) => {
  const { id } = req.params;
  const { nftUserId } = req.body;
  console.log(
    "🚀 ~ file: nftController.js:156 ~ addToCartNFT ~ nftUserId:",
    nftUserId
  );
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(nftUserId)
  ) {
    return res.status(404).json({
      success: false,
      message: "NFT not found",
      error: "Invalid Id",
    });
  }
  try {
    // const nft = await NFT.findById(id).select("user_id");
    const user = await User.findById(req.user.id).select("shoppingCart");
    console.log("🚀 ~ file: nftController.js:169 ~ addToCartNFT ~ user:", user);

    if (nftUserId === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Unable to buy",
        error: "You cannot buy your own NFT",
      });
    }
    const isAlreadyInCart = user.shoppingCart.find((item) => item === id);
    if (isAlreadyInCart) {
      return res.status(400).json({
        success: false,
        message: "Unable to add to cart",
        error: "NFT already in cart",
      });
    } else {
      user.shoppingCart.push(id);
      user.save();

      res.status(200).json({
        success: true,
        message: "NFT added to cart successfully",
        data: user.shoppingCart,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NFT not found",
      error: error.message,
    });
  }
};
const removeFromCartNFT = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "NFT not found",
      error: "Invalid Id",
    });
  }
  try {
    // const nft = await NFT.findById(id).select("_id");
    const user = await User.findById(req.user.id).select("shoppingCart");
    const isInCart = user.shoppingCart.find((item) => item === id);
    if (!isInCart) {
      return res.status(400).json({
        success: false,
        message: "Unable to remove from cart",
        error: "NFT not in cart",
      });
    } else {
      user.shoppingCart = user.shoppingCart.filter((item) => item !== id);
      user.save();

      res.status(200).json({
        success: true,
        message: "NFT removed from cart successfully",
        data: user.shoppingCart,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};
const deleteNFT = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "NFT not found",
      error: "Invalid Id",
    });
  }
  try {
    const deletedNFT = await NFT.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "NFT deleted successfully",
      data: deletedNFT,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NFT not found",
      error: error.message,
    });
  }
};

module.exports = {
  createNFT,
  getNFTs,
  getNFT,
  updateNFT,
  likeNFT,
  addToCartNFT,
  removeFromCartNFT,
  deleteNFT,
};
