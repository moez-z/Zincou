const mongoose = require("mongoose");

const cardItemSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cardItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
