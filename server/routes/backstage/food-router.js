var express = require("express");
const FoodController = require("../../controller/backstage/food-controller");
var FoodRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/food/" });

//? 上传带图片的用户信息
// FoodRouter.post(
//   "/backstage-api/food/upload",
//   upload.single("file"),
//   FoodController.upload
// );
//?新增用户
FoodRouter.post(
  "/backstage-api/food/add",
  upload.single("file"),
  FoodController.add
);
FoodRouter.post(
  "/backstage-api/food/:_id",
  upload.single("file"),
  FoodController.edit
);
//? 编辑用户
// FoodRouter.patch("/backstage-api/food/:_id", FoodController.patchFood);
// //? list
FoodRouter.get("/backstage-api/food/list", FoodController.getList);
FoodRouter.get("/backstage-api/food/list/:_id", FoodController.getList);
FoodRouter.delete("/backstage-api/food/:_id", FoodController.delList);

module.exports = FoodRouter;
