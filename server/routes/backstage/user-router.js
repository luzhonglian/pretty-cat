var express = require("express");
const UserController = require("../../controller/backstage/user-controller");
var UserRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/avatars/" });

UserRouter.post("/backstage-api/user/login", UserController.login);
//? 上传带图片的用户信息
UserRouter.post(
  "/backstage-api/user/upload",
  upload.single("file"),
  UserController.upload
);
//?新增用户
UserRouter.post(
  "/backstage-api/user/add",
  upload.single("file"),
  UserController.add
);
//? 编辑用户
UserRouter.patch("/backstage-api/user/:_id", UserController.patchUser);
//? list
UserRouter.get("/backstage-api/user/list", UserController.getList);
UserRouter.delete("/backstage-api/user/list/:_id", UserController.delList);

module.exports = UserRouter;
