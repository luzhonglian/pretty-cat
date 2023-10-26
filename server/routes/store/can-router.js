var express = require("express");
const CanController = require("../../controller/store/can-controller");
var CanRouter = express.Router();

CanRouter.get("/store-api/can/list", CanController.getList);
// CanRouter.get("/web-api/cat/toplist", CanController.getTopList);
// CanRouter.get("/web-api/cat/list/:_id", CanController.getList);
module.exports = CanRouter;
