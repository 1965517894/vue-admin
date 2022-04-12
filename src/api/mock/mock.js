import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import permissionApi from "./mockData/permission";

Mock.mock("/home/getData", homeApi.getStatisticalData);

Mock.mock(/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/user\/add/, "post", userApi.createUser);
Mock.mock(/usr\/del/, "get", userApi.deleteUser);
Mock.mock(/user\/edit/, "post", userApi.updateUser);

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);
