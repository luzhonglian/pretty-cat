export const dynamicRoutes = [
  {
    path: "/user-center",
    name: "center",
    component: () => import("@/views/user-center/Center.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/Home.vue"),
  },
  //?Cat
  {
    path: "/cat-manage/cat-add",
    name: "cat-add",
    component: () => import("@/views/cat-manage/CatAdd.vue"),
  },
  {
    path: "/cat-manage/cat-list",
    name: "cat-list",
    component: () => import("@/views/cat-manage/CatList.vue"),
  },
  {
    path: "/cat-manage/cat-edit/:_id",
    name: "cat-edit",
    component: () => import("@/views/cat-manage/CatEdit.vue"),
  },
  //?User-manage
  {
    path: "/user-manage/user-add",
    name: "user-add",
    auth: true,
    component: () => import("@/views/user-manage/UserAdd.vue"),
  },
  {
    path: "/user-manage/user-list",
    auth: true,
    name: "user-list",
    component: () => import("@/views/user-manage/UserList.vue"),
  },
  //?Food-manage
  {
    path: "/food-manage/food-add",
    name: "food-add",
    component: () => import("@/views/food-manage/FoodAdd.vue"),
  },
  {
    path: "/food-manage/food-list",
    name: "food-list",
    component: () => import("@/views/food-manage/FoodList.vue"),
  },
  {
    path: "/food-manage/food-edit/:_id",
    name: "food-edit",
    component: () => import("@/views/food-manage/FoodEdit.vue"),
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/NotFound.vue"),
  },
];
