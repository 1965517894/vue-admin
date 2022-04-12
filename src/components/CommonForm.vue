<template>
    <el-form ref="form" label-width="100px" :model="formData" :inline="inline">
        <el-form-item v-for="item in formItems" :key="item.label" :label="item.label">
            <!-- input框 -->
            <el-input v-if="item.type === 'input'" :placeholder="'请输入' + item.label" v-model="formData[item.model]"
                suffix-icon="el-icon-none"></el-input>
            <!-- switch框 -->
            <el-switch v-else-if="item.type === 'switch'" v-model="formData[item.model]"></el-switch>
            <!-- date选择框 -->
            <el-date-picker v-else-if="item.type === 'date'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
                v-model="formData[item.model]"></el-date-picker>

            <!-- 选择框 -->
            <el-select v-else-if="item.type === 'select'" placeholder="请选择" v-model="formData[item.model]">
                <el-option v-for="opt in item.opts" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
            </el-select>
        </el-form-item>
        <div class="confirm-btn">
            <el-button type="success" @click="submitForm">确定</el-button>
            <el-button type="danger" @click="quitForm">取消</el-button>
        </div>
        <el-form-item>
            <slot></slot>
        </el-form-item>
    </el-form>
</template>

<script>

export default {
    name: "CommonForm",
    props: {
        // 表单项数据数组
        formItems: {
            type: Array,
            // 默认值为对象时需用函数返回
            default: () => [],
        },
        inline: {
            type: Boolean,
            default: true
        },
        validator: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            formData: {},
        }
    },
    methods: {
        // 校验表单数据
        checkFromData(data, validator) {
            let keys = Object.keys(validator);
            for (let k of keys) {
                if (!data[k] || !validator[k](data[k])) return false
            }
            return true
        },
        submitForm() {
            // 数据有效就传给父组件 并重置表单 否则返回undefined
            if (this.checkFromData(this.formData, this.validator)) {
                this.$emit("finish", this.formData)
                this.formData = {}
            } else {
                this.$emit("finish", undefined)
            }
        },

        quitForm() {
            this.$emit("quit")
        }
    }
}
</script>

<style scoped>
</style>