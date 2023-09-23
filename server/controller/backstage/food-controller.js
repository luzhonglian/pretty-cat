const FoodService = require("../../services/backstage/food-service");
// const JWT = require("../../utils/jwt");
const FoodController = {


  add: async (req, res) => {
    const { title, detail, introduction } = req.body;
    //cover在前端是后端返回的存储地址/上传时的blob地址
    //在后端是相对路径
    const cover = req.file ? `/food/${req.file.filename}` : "";

    await FoodService.add({
      title,
      cover,
      detail,
      introduction,
    });
    res.status(201).send({
      ActionType: "ok",
    });
  },
  // upload: async (req, res) => {
  //   const { title, detail, introduction,password } = req.body;
  //   const token = req.headers.authorization.split(" ")[1];
  //   let payload = JWT.verify(token);
  //   //cover要抓换为在后端的地址
  //   //? 如果没有上传头像，req.file为null
  //   const cover = req.file ? `/covers/${req.file.filename}` : "";
  //   await FoodService.upload({
  //     _id: payload._id,
  //     title,
  //     cover,
  //     detail: Number(detail),
  //     introduction,
  //     password
  //   });
  //   if (cover) {
  //     res.send({
  //       ActionType: "ok",
  //       data: {
  //         title,
  //         cover,
  //         detail: Number(detail),
  //         introduction,
  //       },
  //     });
  //   } else {
  //     res.send({
  //       ActionType: "ok",
  //       data: {
  //         title,
  //         detail: Number(detail),
  //         introduction,
  //       },
  //     });
  //   }
  // },
  // patchFood: async (req, res) => {
  //   await FoodService.patchFood(req.body);
  //   console.log(req.body)
  //   res.send({
  //     ActionType: "ok",
  //   });
  // },
  getList: async (req, res) => {
    let result = await FoodService.getList(req.params._id);
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
  delList: async (req, res) => {
    await FoodService.delList(req.params._id);
    res.send({
      ActionType: "ok",
    });
  },
  edit: async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { title, introduction, detail } = req.body;
    const cover = req.file ? `/food/${req.file.filename}` : "";

    await FoodService.edit({      
      title,
      introduction,
      detail,
      editTime: new Date(),
      cover,
    },req.params._id);
    res.status(200).send({
      ActionType: "ok",
    });
  },
};

module.exports = FoodController;
