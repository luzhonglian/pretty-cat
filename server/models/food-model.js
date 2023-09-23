const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//?schema规定每条数据的tuple类型
//?model是由schema限定类型的构造函数
const FoodType = {
  title: String,
  introduction: String,
  detail: String,
  cover: String,
  editTime:Date
};

const FoodModel = mongoose.model("food", new Schema(FoodType));
module.exports = FoodModel;
