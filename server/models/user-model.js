const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//?schema规定每条数据的tuple类型
//?model是由schema限定类型的构造函数
const UserType = {
  username: String,
  password: String,
  gender: Number,
  introduction: String,
  avatar: String,
  role: Number,//admin:1,editor:2
};

const UserModel=mongoose.model("user", new Schema(UserType));
module.exports=UserModel;
