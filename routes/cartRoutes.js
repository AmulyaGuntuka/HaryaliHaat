const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart"); // Assuming the Cart model exists
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Replace with your secret key

// Route to add a product to the cart
router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userEmail = decoded.email;

    // Find user's cart or create a new one if it doesn't exist
    let userCart = await Cart.findOne({ userEmail });

    if (!userCart) {
      userCart = new Cart({ userEmail, products: [] });
    }

    // Check if product already exists in the cart
    const existingProductIndex = userCart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      // If the product exists, update the quantity
      userCart.products[existingProductIndex].quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      userCart.products.push({ productId, quantity });
    }

    await userCart.save();
    res.json({ success: true, message: "Product added to cart!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product to cart." });
  }
});

module.exports = router;