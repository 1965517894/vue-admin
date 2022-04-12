<template>
    <div>
        <el-menu :default-active="active" class="el-menu-vertical" :collapse="isCollapse" background-color="#545c64"
            active-text-color="#ffd04b" text-color="#fff">
            <!-- @select="handleSelect" -->
            <h3 style="height:60px;line-height: 60px;text-align: center;color:#fff">{{ isCollapse ? "后台" : "后台管理系统" }}
            </h3>

            <!-- 一级菜单 -->
            <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path" @click="handleMenuClick(item)">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

            <!-- 多级菜单 -->
            <el-submenu v-for=" items in hasChildren" :key="items.label" :index="items.path">
                <template slot="title">
                    <i :class="'el-icon-' + items.icon"></i>
                    <span slot="title">{{ items.label }}</span>
                </template>

                <el-menu-item v-for="item in items.children" :key="item.path" :index="item.path"
                    @click="handleMenuClick(item)">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span slot="title">{{ item.label }}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'CommonAside',
    data() {
        return {
            active: location.pathname,
            // isCollapse: false,
            menu: []

        };
    },
    computed: {
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        noChildren() {
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren() {
            return this.asyncMenu.filter(item => item.children)
        },
        asyncMenu() {
            return this.$store.state.tab.menu;
        }
    },

    methods: {
        // element-ui的@select
        // handleSelect(index) {
        //     if (this.$route.path != index)
        //         this.$router.push(index)
        // },
        handleMenuClick(item) {
            // 跳转路由
            if (this.$route.path != item.path) {
                this.$router.push(item.path)
            }
            this.$store.commit("selectMenu", item)
        }
    }
}
</script>

<style scoped>
.el-menu-vertical {
    height: 100vh;
    border-right: 0;
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
}
</style>