var express = require("express");
const WebFoodController = require("../../controller/web/food-controller");
var WebFoodRouter = express.Router();



WebFoodRouter.get("/web-api/food/list", WebFoodController.getList);

module.exports = WebFoodRouter;
