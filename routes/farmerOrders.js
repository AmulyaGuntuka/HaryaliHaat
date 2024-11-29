const router = require("express").Router();
const multer = require("multer"); // Import multer for file handling
const FarmerOrder = require("../model/FarmerOrder");
const path = require("path");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

//http://localhost:8070/farmerorder/add
router.route("/add").post(upload.single("productImage"), (req, res) => {
  const { name, item, category, quantity, price, district, mobile, address, expireDate } = req.body;
  const productImage = req.file ? req.file.path : null; // Store the image path from multer

  const newFarmerOrder = new FarmerOrder({
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    mobile,
    address,
    expireDate,
  });

  newFarmerOrder
    .save()
    .then(() => {
      res.json({ message: "New Seller Order added successfully!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error adding order." });
    });
});

//http://localhost:8070/sellerorder/
router.route("/").get((req, res) => {
  FarmerOrder.find()
    .then((farmerorders) => {
      res.json(farmerorders);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error fetching orders." });
    });
});

//http://localhost:8070/sellerorder/update/id
router.route("/update/:id").put(async (req, res) => {
  const farmerOrderID = req.params.id;
  const { name, item, category, quantity, price, district, mobile, address, expireDate } = req.body;
  const productImage = req.file ? req.file.path : null; // For updating image if provided

  const updateFarmerOrder = {
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    mobile,
    address,
    expireDate,
  };

  try {
    await FarmerOrder.findByIdAndUpdate(farmerOrderID, updateFarmerOrder);
    res.status(200).json({ message: "Seller Order updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order." });
  }
});

//http://localhost:8070/sellerorder/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  const farmerOrderID = req.params.id;

  try {
    await FarmerOrder.findByIdAndDelete(farmerOrderID);
    res.status(200).json({ message: "Seller Order deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting order." });
  }
});

//http://localhost:8070/sellerorder/get/id
router.route("/get/:id").get(async (req, res) => {
  const farmerOrderID = req.params.id;

  try {
    const order = await FarmerOrder.findById(farmerOrderID);
    res.status(200).json({ message: "Order fetched successfully!", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order." });
  }
});

module.exports = router;
