var express = require("express");
const OrderController = require("../../controller/store/order-controller");
var OrderRouter = express.Router();


// OrderRouter.get("/store-api/order/list", OrderController.getList);
// OrderRouter.get("/web-api/cat/toplist", OrderController.getTopList);
OrderRouter.get("/store-api/order/list/:_id", OrderController.getList);
OrderRouter.post("/store-api/order/list/:_id", OrderController.addOrder);
module.exports = OrderRouter;
