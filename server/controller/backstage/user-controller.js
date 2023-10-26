const UserService = require("../../services/backstage/user-service");
const JWT = require("../../utils/jwt");
const UserController = {
  login: async (req, res) => {
    let result = await UserService.login(req.body);
    if (!result) {
      res.send({
        code: -1,
        error: "用户名或密码错误",
      });
    } else {
      const token = JWT.generate(
        { username: result.username, _id: result._id },
        "1d"
      );
      res.header("authorization", token);
      res.send({
        ActionType: "ok",
        data: {
          username: result.username,
          gender: result.gender ? result.gender : 0,
          introduction: result.introduction,
          avatar: result.avatar,
          role: result.role, //admin:1,editor:2
          _id: result._id,
        },
      });
    }
  },

  upload: async (req, res) => {
    const { username, gender, introduction, password } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    let payload = JWT.verify(token);
    //avatar要抓换为在后端的地址
    //? 如果没有上传头像，req.file为null
    const avatar = req.file ? `/avatars/${req.file.filename}` : "";
    await UserService.upload({
      _id: payload._id,
      username,
      avatar,
      gender: Number(gender),
      introduction,
      password,
    });
    if (avatar) {
      res.send({
        ActionType: "ok",
        data: {
          username,
          avatar,
          gender: Number(gender),
          introduction,
        },
      });
    } else {
      res.send({
        ActionType: "ok",
        data: {
          username,
          gender: Number(gender),
          introduction,
        },
      });
    }
  },
  add: async (req, res) => {
    let { username, gender, introduction, role, password } = req.body;
    //avatar在前端是后端返回的存储地址/上传时的blob地址
    //在后端是相对路径
    const avatar = req.file ? `/avatars/${req.file.filename}` : "";
    //. 下面的是为了uniapp项目小猫店加的，其不需要这些字段
    gender ??= 0;
    role ??= 2;
    introduction ??= "";
    await UserService.add({
      username,
      avatar,
      gender: Number(gender),
      role: Number(role),
      introduction,
      password,
    });
    res.status(201).send({
      ActionType: "ok",
    });
  },
  patchUser: async (req, res) => {
    await UserService.patchUser(req.body);
    console.log(req.body);
    res.send({
      ActionType: "ok",
    });
  },
  getList: async (req, res) => {
    let result = await UserService.getList();
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
  delList: async (req, res) => {
    await UserService.delList(req.params._id);
    res.send({
      ActionType: "ok",
    });
  },
};
module.exports = UserController;
