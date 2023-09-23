const CatService = require("../../services/backstage/cat-service");
const CatController = {
  add: async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { title, content, category, isPublished } = req.body;
    const cover = req.file ? `/cats/${req.file.filename}` : "";
    
    await CatService.add({
      title,
      content,
      category: Number(category),
      isPublished: Number(isPublished),
      editTime: new Date(),
      cover,
    });
    res.status(201).send({
      ActionType: "ok",
    });
  },
  edit: async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { title, content, category } = req.body;
    const cover = req.file ? `/cats/${req.file.filename}` : "";

    await CatService.edit({      
      title,
      content,
      category: Number(category),
      editTime: new Date(),
      cover,
    },req.params._id);
    res.status(200).send({
      ActionType: "ok",
    });
  },
  contentPic: async (req, res) => {
    const url = `/cats/contentPics/${req.file.filename}`;
    let result = await CatService.contentPic(url);
    res.send({
      ActionType: "ok",
      url: result.picUrl,
    });
  },
  getList: async (req, res) => {
    let result = await CatService.getList(req.params?._id);
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
  patchCat: async (req, res) => {
    await CatService.patchCat(req.body);
    res.send({ ActionType: "ok" });
  },
  deleteCat:async (req, res) => {
    await CatService.deleteCat(req.params._id);
    res.send({ ActionType: "ok" });
  },
};
module.exports = CatController;
