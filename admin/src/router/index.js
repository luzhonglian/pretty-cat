import { createRouter, createWebHashHistory } from "vue-router";
import { dynamicRoutes } from "./dynamic";
import store from "@/store/index";

const routes = [
  {
    path: "/login",
    name: "login",
    // beforeEnter: (to, from) => {

    //   if (from.path !== "/login" && from.path!=='/') {
    //     location.reload()
    //     return true;
    //   } else {
    //     return true;
    //   }
    // },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/backstage",
    name: "backstage",
    component: () => import("@/views/BackStage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.path == "/login") {
    //退出登录，清除token
    localStorage.removeItem("token");
    store.commit("setUserInfo");
    router.removeRoute("backstage");
    return true;
  } else if (!localStorage.getItem("token")) {
    return { name: "login" };
  } else {
    if (!store.state.dynamicStatus) {
      getDynamicRoutes();
      return { path: to.fullPath };
    } else {
      return true;
    }
  }
});

const getDynamicRoutes = () => {
  if (!router.hasRoute("backstage")) {
    router.addRoute("backstage", {
      path: "/backstage",
      name: "backstage",
      component: () => import("@/views/BackStage.vue"),
    });
  }
  dynamicRoutes.forEach((route) => {
    authCheck(route) && router.addRoute("backstage", route);
  });
  store.commit("setDynamicStatus", true);
};
const authCheck = (route) => {
  if (!route.auth) {
    return true;
  } else {
    return store.state.userInfo.role === 1;
  }
};
export default router;
