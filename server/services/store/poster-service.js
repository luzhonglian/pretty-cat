const PosterModel = require("../../models/store/poster-model");
const PosterService = {
  getList: async () => {
    
      return PosterModel.find({});
     
  },
 
};
module.exports = PosterService;
