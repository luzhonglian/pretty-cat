const WebFoodService = require("../../services/web/food-service");
// const JWT = require("../../utils/jwt");
const WebFoodController = {
  getList: async (req, res) => {
    let result = await WebFoodService.getList(req.params._id);
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
};

module.exports = WebFoodController;
