const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const goodType={
  name: String,
  count: Number,
  price: Number,
  img: String,
}
const orderType={
   oid: String,//订单编号
  sum:Number,//总价
  time:Date,//订单时间
  goodList:[goodType]
}

const OrderType = {
  uid: String,
  orderList:[orderType]
 
  // list:[GoodType],
};

const OrderModel = mongoose.model("order", new Schema(OrderType));
module.exports = OrderModel;
