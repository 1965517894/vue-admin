<template>
    <div class="tabs">
        <el-tag
            v-for="item in tabs"
            :key="item.path"
            size="small"
            :closable="item.name !== 'home'"
            :effect="currentTab === item.path ? 'dark' : 'plain'"
            @close="handleCloseTab(item)"
            @click="handleClickTab(item)"
        >{{ item.label }}</el-tag>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CommonTabs",
    computed: {
        ...mapState({
            tabs: state => state.tab.tabStack,
            currentTab: state => state.tab.currentTab,
        })
    },
    methods: {
        handleCloseTab(item) {
            this.$store.commit("removeTab", item)
            this.$router.push(this.currentTab)
        },
        handleClickTab(item) {
            this.$store.commit("changeCurrentTab", item.path)
            this.$router.push(item.path)
        }
    },

};
</script>

<style lang="less" scoped>
.tabs {
    text-align: left;
    margin-bottom: 10px;
    .el-tag {
        cursor: pointer;
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
}
</style>