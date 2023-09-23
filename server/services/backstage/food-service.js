const FoodModel = require("../../models/food-model");

const FoodService = {
  add: async ({ title, cover, introduction, detail }) => {
    return FoodModel.create({
      title,
      cover,
      introduction,
      detail,
      editTime: new Date(),
    });
  },
  edit: async (payload, _id) => {
    const { cover } = payload;
    !cover && Reflect.deleteProperty(payload, "cover");
    return FoodModel.updateOne({ _id }, payload);
  },
  // upload: async ({ _id, title, cover, , introduction, detail }) => {
  //   let updateData = { title, , introduction };

  //   cover && (updateData.cover = cover);
  //   detail && (updateData.detail = detail);

  //   return FoodModel.updateOne({ _id }, updateData);
  // },
  // patchFood: async ({ _id, title, detail, , introduction }) => {
  //   if (detail) {
  //     return FoodModel.updateOne(
  //       { _id },
  //       { title, detail, , introduction }
  //     );
  //   } else {
  //     return FoodModel.updateOne({ _id }, { title, , introduction });
  //   }
  // },

  getList: async (_id) => {
    return _id ? FoodModel.findOne({ _id }) : FoodModel.find({});
  },
  delList: async (_id) => {
    return FoodModel.deleteOne({ _id });
  },
};
module.exports = FoodService;
