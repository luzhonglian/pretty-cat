## 前端(Vue)

```javascript
//Editor.vue-->我将其封装为一个组件

const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      /* 
        @server：post到后端的api

        @fieldName：form-data fieldName ，默认值 'wangeditor-uploaded-image',因为我在后端form-data命名为file，所以改了

        @customInsert：wangEditor规定了后端response body的格式，不想遵循就要用这个这个方法
    */
      server: "/backstage-api/cat/content-pic",

      fieldName: "file",

      customInsert(res, insertFn) {
        const url = "http://localhost:3000" + res.url;
        if (res.ActionType == "ok") {
          // 从 res 中找到 url alt href ，然后插入图片
          insertFn(url);
        }
      },
    },
  },
};
```

> https://www.wangeditor.com/v5/menu-config.html#%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87

## 后端(Nodejs，使用 express+multer)

```javascript
//cat-router.js

var express = require("express");
const CatController = require("../../controller/backstage/cat-controller");
var CatRouter = express.Router();
const multer = require("multer");
const uploadPic = multer({ dest: "public/cats/contentPics/" });

CatRouter.post(
  "/backstage-api/cat/content-pic",
  uploadPic.single("file"),
  CatController.contentPic //交给该回调函数处理
);
module.exports = CatRouter; //用于在app.js中use
```

```javascript
//cat-controller.js

const CatService = require("../../services/backstage/cat-service");

const CatController = {
  contentPic: async (req, res) => {
    //存储在后端的地址
    const url = `/cats/contentPics/${req.file.filename}`;
    let result = await CatService.contentPic(url); //用于将url存入数据库的方法
    res.send({
      ActionType: "ok",
      url: result.picUrl,
    });
  },
};

module.exports = CatController;
```

```javascript
//cat-service.js

const CatModel = require("../../models/cat-model");
const CatService = {
  contentPic: async (url) => {
    return CatModel.create({ picUrl: url }); //与mongodb交互，创建存有图片地址的文档
  },
};

module.exports = CatService;
```

```javascript
//cat-model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//?schema规定每条数据的tuple类型,未定义的会被忽略
//?model是由schema限定类型的构造函数
const CatType = {
  //其他自定义数据字段和类型
  picUrl: String,
};
const CatModel = mongoose.model("cat", new Schema(CatType));

module.exports = CatModel;
```

## OK了家人们！