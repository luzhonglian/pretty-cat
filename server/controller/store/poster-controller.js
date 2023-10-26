const PosterService = require("../../services/store/poster-service");
const PosterController = {
 
  getList: async (req, res) => {
    let result = await PosterService.getList();
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
};
module.exports = PosterController;
