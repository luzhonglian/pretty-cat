const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//?schema规定每条数据的tuple类型
//?model是由schema限定类型的构造函数
const CatType = {
  title: String,
  content: String,
  category: Number,
  cover: String,
  isPublished: Number,
  editTime: Date,
  picUrl: String,
};

const CatModel = mongoose.model("cat", new Schema(CatType));
module.exports = CatModel;
