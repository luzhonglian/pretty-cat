const CanModel = require("../../models/store/can-model");
const CanService = {
  getList: async () => {
    return CanModel.find({});
  },
};
module.exports = CanService;
