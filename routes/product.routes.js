const router = require("express").Router();
const mongoose = require("mongoose");

const Product = require("../models/Product.model");

router.post("/products", (req, res, next) => {
  const { name, price, description, qty, img } = req.body;

  Product.create({ name, price, description, qty, img })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/products", (req, res, next) => {
  Product.find()
    .then((allProducts) => res.json(allProducts))
    .catch((err) => res.json(err));
});

router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "No such product exist" });
    return;
  }

  Product.findById(productId)
    .then((product) => res.status(200).json(product))
    .catch((error) => res.json(error));
});

router.put("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "No such product exist" });
    return;
  }

  Product.findByIdAndUpdate(productId, req.body, { new: true })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((error) => res.json(error));
});

router.delete("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "No such product exist" });
    return;
  }

  Product.findByIdAndRemove(productId)
    .then(() => res.json({ message: `  successfully Deleted ${productId}.` }))
    .catch((error) => res.json(error));
});

module.exports = router;
