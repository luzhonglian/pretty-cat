const CanService = require("../../services/store/can-service");
const CanController = {
  getList: async (req, res) => {
    let result = await CanService.getList();
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
};
module.exports = CanController;
