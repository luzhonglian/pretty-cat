const CatModel = require("../../models/cat-model");
const WebCatService = {
  getList: async (_id) => {
    if (!_id) {
      return CatModel.find({ title: { $exists: true }, isPublished: 1 }).sort({
        editTime: -1,
      });
    } else {
      return CatModel.findOne({ _id, isPublished: 1 });
    }
  },
  getTopList: async (limit) => {
    return CatModel.find({ title: { $exists: true }, isPublished: 1 }).sort({
      editTime: -1,
    }).limit(limit);
  },
};
module.exports = WebCatService;
