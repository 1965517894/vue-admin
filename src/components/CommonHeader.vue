<template>
    <div class="header">
        <div class="left-content">
            <el-button icon="el-icon-menu" size="mini" @click="handleCollapse"></el-button>
            <p>
                <el-breadcrumb separator="|">
                    <el-breadcrumb-item v-for="item in tabStack" :key="item.path" :to="{ path: item.path }">{{
                        item.label
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
            </p>
        </div>
        <div class="right-content">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="user-icon">
                    <img src="../assets/images/user.png" alt />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { resetRouter } from "../router"

export default {
    name: "CommonHeader",
    methods: {
        handleCollapse() {
            this.$store.commit("toggleCollapse")
        },
        handleCommand(command) {
            if (command === 'loginOut') {
                this.$store.commit("clearToken");
                this.$store.commit("clearMenu");
                this.$router.push("/login")
                this.$router.matcher = resetRouter().matcher
            }
        }
    },
    computed: {
        ...mapState({
            tabStack: (state) => state.tab.tabStack,
        }),
    },
    mounted() {

    },
};
</script>

<style lang="less" scoped>
.header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    .left-content {
        display: flex;
        align-items: center;

        .el-breadcrumb {
            margin-left: 20px;

            // 样式穿透
            /deep/ .el-breadcrumb__inner {
                color: #fff;

                &:hover {
                    color: #5ab1ef;
                    cursor: pointer;
                }
            }
        }
    }

    .right-content {
        .user-icon {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
    }
}
</style>