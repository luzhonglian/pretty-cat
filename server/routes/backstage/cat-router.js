var express = require("express");
const CatController = require("../../controller/backstage/cat-controller");
var CatRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/cats/" });
const uploadPic = multer({ dest: "public/cats/contentPics/" });

CatRouter.post(
  "/backstage-api/cat/add",
  upload.single("file"),
  CatController.add
);
CatRouter.post(
  "/backstage-api/cat/content-pic",
  uploadPic.single("file"),
  CatController.contentPic
);
CatRouter.post(
  "/backstage-api/cat/:_id",
  upload.single("file"),
  CatController.edit
); //用户更新内容

CatRouter.get("/backstage-api/cat/list", CatController.getList);
CatRouter.get("/backstage-api/cat/list/:_id", CatController.getList);
CatRouter.patch("/backstage-api/cat/:_id", CatController.patchCat); //用于更新isPublished
CatRouter.delete("/backstage-api/cat/:_id", CatController.deleteCat);
module.exports = CatRouter;
