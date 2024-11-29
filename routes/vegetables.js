// products.js (Routes)
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Product = require("../model/Product"); // Correct path to Product model


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
  }
});

const upload = multer({ storage: storage });

// Add product route (handling file upload)
router.route("/add").post(upload.single("productImage"), (req, res) => {
  const { name, item, category, quantity, price, district, mobile, address, expireDate, farmerId } = req.body;
  const productImage = req.file ? req.file.filename : null; // Save the image file name

  const newProduct = new Product({
    name,
    item,
    productImage, // Save the file name here
    category,
    quantity,
    price,
    district,
    mobile,
    address,
    expireDate,
    farmerId // Save the farmer's ID along with product details
  });

  newProduct
    .save()
    .then(() => {
      res.json({ message: "Product added successfully!" });
    })
    .catch((error) => {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Failed to add product." });
    });
});

// Fetch all products route
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch products." });
    });
});

// Get products by category
router.route("/:category").get(async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category: category }); // Changed field to `category` assuming your model uses it
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error fetching products" });
  }
});

// Get products by farmer
router.route("/farmer/:farmerId").get(async (req, res) => {
  const farmerId = req.params.farmerId;
  try {
    const products = await Product.find({ farmerId: farmerId }); // Assuming each product has a farmerId field
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error fetching farmer's products" });
  }
});

module.exports = router;
