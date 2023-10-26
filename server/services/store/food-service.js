const FoodModel = require("../../models/store/food-model");
const FoodService = {
  getList: async () => {
    return FoodModel.find({});
  },
};
module.exports = FoodService;
