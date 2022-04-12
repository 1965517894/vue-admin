import Vue from "vue";
import App from "./App.vue";
import "./assets/less/index.less";

// 按需引入element ui
import "./plugin/elementUI";
import "./api/mock/mock";

import router from "./router";
import store from "./store";

import Echarts from "./plugin/echarts";

Vue.use(Echarts);

Vue.config.productionTip = false;

new Vue({
  router, // this.$route
  store,
  render: (h) => h(App),
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
