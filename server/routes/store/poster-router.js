var express = require("express");
const PosterController = require("../../controller/store/poster-controller");
var PosterRouter = express.Router();


PosterRouter.get("/store-api/poster/list", PosterController.getList);
// PosterRouter.get("/web-api/cat/toplist", PosterController.getTopList);
// PosterRouter.get("/web-api/cat/list/:_id", PosterController.getList);
module.exports = PosterRouter;
