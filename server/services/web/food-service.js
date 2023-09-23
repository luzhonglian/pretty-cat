const FoodModel = require("../../models/food-model");

const WebFoodService = {

  getList: async (_id) => {
    return _id ? FoodModel.findOne({ _id }) : FoodModel.find({});
  },
};
module.exports = WebFoodService;
