<template>
    <div class="user-manager">
        <!-- 对话框 -->
        <el-dialog title="新增用户" :visible="isShow" @update:visible="handleUpdateVisible">
            <!-- 需传入表单项数据 -->
            <common-form :formItems="formItemsData" :inline="true" @finish="handleAddUser" @quit="handleQuitForm"
                :validator="checkFrom"></common-form>
        </el-dialog>
        <!-- 点击dialog中的X 会触发 -->

        <div class="header">
            <el-button type="primary" plain @click="handleUpdateVisible">+ 新增</el-button>
            <div class="search">
                <el-input type="text" v-model="searchKey" placeholder="搜索"></el-input>
                <el-button icon="el-icon-search" type="primary" @click="handleSearch"></el-button>
            </div>
        </div>

        <common-table :tableData="tableData" :tableLabel="tableLabel" :config.sync="config" @edit="editUser"
            @delete="deleteUser" @changePage="updateUser">
        </common-table>
    </div>
</template>

<script>
import CommonForm from "../../components/CommonForm"
import CommonTable from "../../components/CommonTable"
import { getUser, addUser } from "../../api/data"
export default {
    name: "UserView",
    components: { CommonForm, CommonTable },
    data() {
        return {
            isShow: false,
            formItemsData: [
                {
                    model: "name",
                    label: "姓名",
                    type: "input",
                },
                {
                    model: "age",
                    label: "年龄",
                    type: "input",
                },
                {
                    model: "sex",
                    label: "性别",
                    type: "select",
                    opts: [
                        {
                            label: "男",
                            value: 1,
                        },
                        {
                            label: "女",
                            value: 0,
                        },
                    ],
                },
                {
                    model: "birth",
                    label: "出生日期",
                    type: "date",
                },
                {
                    model: "addr",
                    label: "地址",
                    type: "input",
                },
            ],
            searchKey: '',
            // searchFrom: {
            //     keyword: "",
            // },
            tableData: [],
            tableLabel: [
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "age",
                    label: "年龄"
                },
                {
                    prop: "sex",
                    label: "性别"
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 320
                }
            ],
            config: {
                total: 200,
                pageSize: 10,
                curPage: 1,
            },
            // 表单校验
            checkFrom: {
                name: (val) => {
                    if (val.trim().length > 0) return true
                    return false
                },
                age: (val) => {
                    if (val && parseInt(val) > 0) return true
                    return false
                }
            }

        }
    },
    methods: {
        handleUpdateVisible() {
            this.isShow = !this.isShow;
        },

        /**
         * 获取用户列表 并更新表格数据
         * 要带参数 name, page, limit; name可以不填, page,limit有默认值。
         * @param name, page, limit
         * @return {{code: number, count: number, data: *[]}}
         */
        getList(params) {
            getUser(params).then(res => {
                console.log(res);
                this.tableData = res.data.list.map(item => {
                    item.sex = item.sex === 0 ? "女" : "男"
                    return item
                })
            });
        },

        handleAddUser(data) {
            if (!data) {
                // TODO：弹出提示框
                console.log('请正确填写信息');
                return
            }
            this.isShow = false;
            addUser(data).then((res) => {
                console.log(res);
                this.getList()
            })

        },
        handleQuitForm() {
            // console.log("quit");
            this.isShow = false;
        },
        handleSearch() {
            if (this.searchKey.trim()) {
                console.log("search");
                this.getList({ name: this.searchKey.trim() })
            }
        },
        editUser(row) {
            console.log('edit', row);
        },
        deleteUser(row) {
            console.log('delete', row);
        },
        updateUser(index) {
            this.getList({ page: index })
            // console.log('pagination', index);
        },

    },
    created() {
        this.getList({ limit: 10 })
    }
};
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-right: 20px;
    margin-bottom: 20px;

    .search {
        .el-input {
            width: 200px;
            margin-right: 5px;
        }
    }
}
</style>