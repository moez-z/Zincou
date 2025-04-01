const express = require("express");
const Card = require("../models/Card");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get card by userId or guestId
const getCard = async (userId, guestId) => {
  if (userId) {
    return await Card.findOne({ user: userId });
  } else if (guestId) {
    return await Card.findOne({ guestId });
  }
  return null;
};

// @route Post api/cards
// @desc Add a product to cart for user
// @access Public
router.post("/", protect, async (req, res) => {
  const { productId, quantity, size, color, guestId } = req.body;
  const userId = req.user ? req.user._id : null;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Determine card based on user or guest ID
    let card = await getCard(userId, guestId);

    if (card) {
      const productIndex = card.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // Update quantity
        card.products[productIndex].quantity =
          Number(card.products[productIndex].quantity) + Number(quantity);
      } else {
        // Add new product
        card.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url || product.images[0], // Handle both object and string formats
          price: product.price,
          size,
          color,
          quantity: Number(quantity),
        });
      }

      card.totalPrice = card.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await card.save();
      return res.status(200).json(card);
    } else {
      // Create new card
      const newCard = new Card({
        user: userId,
        guestId: guestId || "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0]?.url || product.images[0], // Handle both object and string formats
            price: product.price,
            size,
            color,
            quantity: Number(quantity),
          },
        ],
        totalPrice: product.price * Number(quantity),
      });

      await newCard.save();
      return res.status(201).json(newCard);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT api/cards
// @desc Update a product in cart for user
// @access Public
router.put("/", protect, async (req, res) => {
  const { productId, quantity, size, color, guestId } = req.body;
  const userId = req.user ? req.user._id : null;

  try {
    let card = await getCard(userId, guestId);
    if (!card) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = card.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (Number(quantity) > 0) {
        // Set new quantity directly instead of adding
        card.products[productIndex].quantity = Number(quantity);
      } else {
        // Remove product if quantity is 0 or negative
        card.products.splice(productIndex, 1);
      }

      card.totalPrice = card.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await card.save();
      return res.status(200).json(card);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE api/cards
// @desc Remove a product from cart for user
// @access Public
router.delete("/", protect, async (req, res) => {
  const { productId, size, color, guestId } = req.body;
  const userId = req.user ? req.user._id : null;

  try {
    let card = await getCard(userId, guestId);

    if (!card) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = card.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      card.products.splice(productIndex, 1);
      card.totalPrice = card.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await card.save();
      return res.status(200).json(card);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET api/cards
// @desc Get cart for user
// @access Public
router.get("/", protect, async (req, res) => {
  const userId = req.user ? req.user._id : null;
  const guestId = req.query.guestId || null;

  try {
    const card = await getCard(userId, guestId);

    if (card) {
      return res.status(200).json(card);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST api/cards/merge
// @desc Merge guest cart with user cart
// @access Public
router.post("/merge", protect, async (req, res) => {
  const userId = req.user ? req.user._id : null;
  const guestId = req.body.guestId;

  try {
    const guestCard = await Card.findOne({ guestId });
    const userCard = await Card.findOne({ user: userId });
    if (guestCard) {
      if (guestCard.products.length === 0) {
        return res.status(404).json({ message: "Guest cart is empty" });
      }
      if (userCard) {
        guestCard.products.forEach((guestItem) => {
          const productIndex = userCard.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            userCard.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCard.products.push(guestItem);
          }
        });
        userCard.totalPrice = userCard.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCard.save();

        try {
          await Card.findOneAndDelete({ guestId });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Server error" });
        }

        return res.status(200).json(userCard);
      } else {
        guestCard.user = req.user._id;
        guestCard.guestId = null;
        await guestCard.save();

        res.status(200).json(guestCard);
      }
    } else {
      if (userCard) {
        return res.status(200).json(userCard);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
