<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" class="login-container">
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-button type="primary" @click="login" class="login-submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getMenu } from "../../api/data"
export default {
    name: "LoginView",
    data() {
        return {
            form: {
                username: "admin",
                password: "admin"
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        message: "用户名长度不能小于3位",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        login() {
            // 登录成功  获取token 存入cookie
            getMenu(this.form).then(res => {
                if (res.data.code === 20000) {
                    this.$store.commit("clearMenu");
                    this.$store.commit("setMenu", res.data.data.menu);
                    this.$store.commit("setToken", res.data.data.token)
                    this.$store.commit("addMenu", this.$router)

                    this.$router.push({ name: 'home' })
                } else {
                    console.log("登录失败");
                }
            })
            // const token = Mock.Random.guid();
            // console.log(token);
            // this.$store.commit("setToken", token)
            // this.$router.push({ name: 'home' })
        }
    },
};
</script>

<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .login-title {
        margin-bottom: 30px;
        text-align: center;
        color: #505458
    }

    .login-submit {
        display: block;
        margin: 10px auto;
    }
}
</style>