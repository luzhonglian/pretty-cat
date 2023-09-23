const WebCatService = require("../../services/web/cat-service");
const WebCatController = {
 
  getList: async (req, res) => {
    let result = await WebCatService.getList(req.params?._id);
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
  getTopList: async (req, res) => {
    let result = await WebCatService.getTopList(req.query.limit);
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
};
module.exports = WebCatController;
