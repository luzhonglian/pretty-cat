const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodType = {
  name: String,
  intro: String,
  price: Number,
  img: String,
};

const FoodModel = mongoose.model("store-food", new Schema(FoodType));
module.exports = FoodModel;
