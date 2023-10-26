const FoodService = require("../../services/store/food-service");
const FoodController = {
  getList: async (req, res) => {
    let result = await FoodService.getList();
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
};
module.exports = FoodController;
