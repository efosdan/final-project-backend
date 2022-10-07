const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: String,

  price: Number,

  description: String,

  qty: Number,

  img: String,
});

module.exports = model("Product", ProductSchema);
