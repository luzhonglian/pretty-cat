const CatModel = require("../../models/cat-model");
const CatService = {
  add: async (payload) => {
    return CatModel.create(payload);
  },
  edit: async (payload, _id) => {
    const { cover } = payload;
    !cover && Reflect.deleteProperty(payload, "cover");
    return CatModel.updateOne({ _id }, payload);
  },
  contentPic: async (url) => {
    return CatModel.create({ picUrl: url });
  },
  getList: async (_id) => {
    if (!_id) {
      return CatModel.find({ title: { $exists: true } });
    } else {
      return CatModel.findOne({ _id });
    }
  },
  patchCat: async ({ _id, isPublished }) => {
    return CatModel.findOneAndUpdate(
      { _id },
      { isPublished, editTime: new Date() }
    );
  },
  deleteCat: async (_id) => {
    return CatModel.deleteOne({ _id });
  },
};
module.exports = CatService;
