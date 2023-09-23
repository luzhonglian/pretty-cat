var express = require("express");
const WebCatController = require("../../controller/web/cat-controller");
var WebCatRouter = express.Router();


WebCatRouter.get("/web-api/cat/list", WebCatController.getList);
WebCatRouter.get("/web-api/cat/toplist", WebCatController.getTopList);
WebCatRouter.get("/web-api/cat/list/:_id", WebCatController.getList);
module.exports = WebCatRouter;
