import * as echarts from "echarts";

export default {
  install: (Vue) => {
    Vue.prototype.$echarts = {
      // 折线图
      getChart(id, option) {
        if (document.getElementById(id) == null) {
          return;
        }
        const chartDom = document.getElementById(id);
        echarts.dispose(chartDom);
        const myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
      },
      //
    };
  },
};
