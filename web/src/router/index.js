import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/cat",
    name: "cat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Cat.vue"),
  },
  {
    path: "/cat/:_id",
    name: "detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../components/Detail.vue"),
  },
  {
    path: "/food",
    name: "food",
    component: () => import("../views/Food.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
