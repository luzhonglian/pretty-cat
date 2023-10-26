const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CanType = {
  name: String,
  intro: String,
  price: Number,
  img: String,
};

const CanModel = mongoose.model("can", new Schema(CanType));
module.exports = CanModel;
