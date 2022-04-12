<template>
    <div class="common-table">
        <el-table :data="tableData" stripe>
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width || 125">
                <!-- <template v-slot="scope">
                    <span style="margin-left:10px">{{ scope }}</span>
                </template>-->
            </el-table-column>
            <el-table-column label="操作" min-width="180" v-slot="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev,pager,next" :total="config.total" :page-size="config.pageSize"
            :current-page="config.curPage" @current-change="handleChangePage"></el-pagination>  </div>
</template>

<script>
export default {
    name: "CommonTable",
    data() {
        return {

        }
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        tableLabel: {
            type: Array,
            default: () => []
        },
        config: {
            type: Object,
            default: () => ({
                total: 0,
                pageSize: 0,
                curPage: 1,
            })
        }
    },
    methods: {
        handleEdit(row) {
            this.$emit("edit", row)
        },
        handleDelete(row) {
            this.$emit("delete", row)

        },
        handleChangePage(index) {
            this.$emit("changePage", index)
        }
    }
};
</script>

<style  lang="less" scoped>
.common-table {
    background-color: #fff;

    .el-pagination {
        margin-top: 5px;
    }
}
</style>