const UserModel = require("../../models/user-model");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.findOne({ username, password });
  },
  upload: async ({ _id, username, avatar, gender, introduction, password }) => {
    let updateData = { username, gender, introduction };

    avatar && (updateData.avatar = avatar);
    password && (updateData.password = password);

    return UserModel.updateOne({ _id }, updateData);
  },
  patchUser: async ({ _id, username, password, role, introduction }) => {
    if (password) {
      return UserModel.updateOne(
        { _id },
        { username, password, role, introduction }
      );
    } else {
      return UserModel.updateOne({ _id }, { username, role, introduction });
    }
  },
  add: async ({ username, avatar, gender, introduction, role, password }) => {
    return UserModel.create({
      username,
      avatar,
      gender,
      introduction,
      role,
      password,
    });
  },
  getList: async () => {
    return UserModel.find({}, [
      "username",
      "avatar",
      "gender",
      "introduction",
      "role",
    ]);
  },
  delList: async (_id) => {
    return UserModel.deleteOne({ _id });
  },
};
module.exports = UserService;
