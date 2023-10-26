const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PosterType = {
  name: String,
  intro: String,
  price: Number,
  img: String,
};

const PosterModel = mongoose.model("poster", new Schema(PosterType));
module.exports = PosterModel;
