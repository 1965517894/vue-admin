import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";

// 先use 后new
Vue.use(VueRouter);

const RouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: () => import("../views/MainView.vue"),
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => import("../views/home"),
      // },
      // {
      //   path: "/mall",
      //   name: "mall",
      //   component: () => import("../views/mall"),
      // },
      // {
      //   path: "/user",
      //   name: "user",
      //   component: () => import("../views/user"),
      // },
      // {
      //   path: "/page1",
      //   name: "page1",
      //   component: () => import("../views/other/PageOne.vue"),
      // },
      // {
      //   path: "/page2",
      //   name: "page2",
      //   component: () => import("../views/other/PageTwo.vue"),
      // },
      // {
      //   path: "*",
      //   redirect: "/home",
      // },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

router.beforeEach((to, from, next) => {
  // console.table(to);
  store.commit("getToken");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name == "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
export const resetRouter = () =>
  new VueRouter({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "main",
        redirect: "/home",
        component: () => import("../views/MainView.vue"),
        children: [],
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/login/index.vue"),
      },
    ],
  });
