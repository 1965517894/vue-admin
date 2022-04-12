import axios from "axios";
import base from "./base";

const baseUrl = base.baseUrl.dev;

// 包装axios类
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baserUrl: this.Url,
      header: {},
    };
    return config;
  }
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = { ...this.getInsideConfig, ...options };
    this.interceptors(instance);
    return instance.request(options);
  }
}

export default new HttpRequest(baseUrl);
