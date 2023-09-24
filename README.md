# 全栈项目：美猫网（Vue3.2+Nodejs+MongoDB）

## 目录

- [全栈项目：美猫网（Vue3.2+Nodejs+MongoDB）](#全栈项目美猫网vue32nodejsmongodb)
  - [目录](#目录)
  - [项目演示 ](#项目演示-)
  - [项目介绍 ](#项目介绍-)
  - [项目运行准备 ](#项目运行准备-)
  - [项目运行 ](#项目运行-)
  - [开发中的踩坑记录 ](#开发中的踩坑记录-)
  - [感想 ](#感想-)

## 项目演示 <a name = "demo"></a>

https://www.bilibili.com/video/BV1hm4y1573b

## 项目介绍 <a name = "about"></a>

### 前端：Vue-cli+Element Plus+Vue3.2+Vue-Router+Vuex+Axios+wangEditor+setup 语法糖编写  
-----**后台管理网页**（文件夹 admin）    
[美猫网后台管理README](admin/README.md)

-----**用户网页**（文件夹 web）  
[美猫网用户网页README](web/README.md)


### 后端：express+multer+mongoDB 编写（文件夹 server）  
[后端README](server/README.md)

**项目内容**： 略多，详见项目演示

## 项目运行准备 <a name = "getting_started"></a>

**安装 node、npm、mongoDB**

## 项目运行 <a name = "usage"></a>

```cmd
//进入server
npm install
npm start
//连接mongoDB，推荐使用compass

//进入web
npm install
npm run serve
//再进入admin
npm install
npm run serve
```

## 开发中的踩坑记录 <a name = "bug"></a>

**-element-plus icon 导入后必须加 i-ep 才能用**

```html
<el-icon><i-ep-picture-filled /></el-icon>
```

**-ico 网页图标必须放在 public 文件夹下**

**-calc 规则**

```css
calc(100vh - 60px)//正确写法
calc(100vh-60px) //-两边没有空格，会被当成变量名而失效
```

## 感想 <a name = "opinion"></a>

自动导入真爽
