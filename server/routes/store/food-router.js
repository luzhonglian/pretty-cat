var express = require("express");
const FoodController = require("../../controller/store/food-controller");
var FoodRouter = express.Router();

FoodRouter.get("/store-api/food/list", FoodController.getList);
// FoodRouter.get("/web-api/cat/toplist", FoodController.getTopList);
// FoodRouter.get("/web-api/cat/list/:_id", FoodController.getList);
module.exports = FoodRouter;
