import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false,
    tabStack: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentTab: "/home",
    menu: [],
  },
  mutations: {
    // 折叠菜单
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 面包屑
    selectMenu(state, menuItem) {
      if (menuItem.name) {
        state.currentTab = menuItem.path;
      }
      if (menuItem.path !== "/home") {
        // 点击非首页菜单项时
        // let _index = state.tabStack.indexOf(menuItem);
        // if (_index === -1) {
        //   state.tabStack.push(menuItem);
        // } else {
        //   state.tabStack.push(...state.tabStack.splice(_index, 1));
        // }
        if (!state.tabStack.includes(menuItem)) {
          state.tabStack.push(menuItem);
        }
      }
    },
    // tabs
    removeTab(state, tab) {
      let _index = state.tabStack.indexOf(tab);
      if (_index !== -1) {
        // 删除点击tab 若删除标签为当currentTab，改变currentTab
        state.tabStack.splice(_index, 1);
        if (tab.path === state.currentTab) {
          state.currentTab = state.tabStack[_index]
            ? state.tabStack[_index].path
            : state.tabStack[_index - 1].path;
        }
      }
    },
    // 更改 currentTab
    changeCurrentTab(state, val) {
      state.currentTab = val;
    },
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, router) {
      // console.log("all cookie", Cookie.get());
      if (!Cookie.get("menu")) {
        return;
      }
      // 从cookie中读取menu数据
      // console.log(Cookie.get("menu"));
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            // console.log(`../views/${child.url}`);

            child.component = () => import(`../views/${child.url}`);
            menuArray.push(child);
          });
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      // console.table(menuArray);
      // 路由的动态添加
      menuArray.forEach((item) => {
        router.addRoute("main", item);
      });
    },
  },
  actions: {},
  getters: {},
};
