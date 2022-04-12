<template>
  <div class="main">
    <el-container>
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <common-tabs></common-tabs>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside"
import CommonHeader from "../components/CommonHeader"
import CommonTabs from "../components/commonTabs"

export default {
  data() {
    return {

    }
  },
  components: {
    CommonAside, CommonHeader, CommonTabs
  },
};
</script>

<style scoped>
.el-container {
  background-color: #545c64;
}

.el-header {
  background-color: #333;
  color: #fff;
}

.el-aside {
  height: 100%;
  /* background-color: red; */
}

.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  padding-top: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>