const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftSchema = new Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    desc: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?w=1200&ssl=1",
    },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    user_id: { type: String },
    views: [{ type: String }],
    likes: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("NFT", nftSchema);
