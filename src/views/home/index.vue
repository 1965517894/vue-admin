<template>
    <el-row class="home" :gutter="20">
        <!-- 首页左侧内容 -->
        <el-col :span="8">
            <!-- 用户信息 -->
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" alt="用户头像" />
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>
                        上次登录时间：
                        <span>2022-2-25</span>
                    </p>
                    <p>
                        上次登录地点：
                        <span>武汉</span>
                    </p>
                </div>
            </el-card>
            <!-- 表格 -->
            <el-card style="margin-top: 20px;height: 517px;">
                <el-table :data="tableData" style="width: 100%" stripe>
                    <el-table-column v-for="(item, index) in tableLabel" :key="item" :prop="index" :label="item">
                    </el-table-column>
                    <!-- <el-table-column prop="monthBuy" label="地址"></el-table-column>
                    <el-table-column prop="totalBuy" label="地址"></el-table-column>-->
                </el-table>
            </el-card>
        </el-col>

        <!-- 首页右侧内容 -->
        <el-col :span="16">
            <!-- 订单数据 -->
            <el-row class="order">
                <el-card v-for="item in countData" :key="item.name" :body-style="{
                    display: 'flex',
                    padding: 0
                }">
                    <i :class="'el-icon-' + item.icon" class="icon" :style="{ 'background-color': item.color }"></i>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </el-row>

            <!-- 折线图 -->
            <el-row>
                <el-card>
                    <div id="line-chart" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-row>

            <el-row class="graph">
                <!-- 柱状图 -->
                <el-card id="bar-chart" style="height: 260px;"></el-card>
                <!-- 饼图 -->
                <el-card id="pie-chart" style="height: 260px;"></el-card>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import { getData } from "../../api/data"
export default {
    name: "HomeView",
    data() {
        return {
            userImg: require("../../assets/images/user.png"),
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        }
    },
    created() {
        getData().then(res => {
            if (res.data.code === 20000) {
                const { tableData, orderData, userData, videoData } = res.data.data;
                this.tableData = tableData;

                // 折线图
                const keyArray = Object.keys(orderData.data[0])
                const series = []
                keyArray.forEach((item) => {
                    series.push({
                        name: item,
                        type: "line",
                        data: orderData.data.map(e => e[item])
                    })
                })

                const lineOption = {
                    title: {
                        text: "折线图"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        data: orderData.date,
                    },
                    yAxis: {},
                    legend: {
                        data: keyArray
                    },
                    series
                };
                this.$echarts.getChart("line-chart", lineOption);

                // 柱状图
                const barOption = {
                    title: {
                        text: "柱状图",
                    },

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: userData.map(item => item.date),
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {},
                    legend: {
                        data: ["新用户", "活跃用户"]
                    },
                    series: [
                        {
                            name: "新用户",
                            type: 'bar',
                            data: userData.map(item => item.new),
                        },
                        {
                            name: "活跃用户",
                            type: 'bar',
                            data: userData.map(item => item.active),
                        }
                    ]
                };
                this.$echarts.getChart("bar-chart", barOption);
                // 饼图
                const pieOption = {
                    title: {
                        text: '饼图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'horizontal',
                        top: 'bottom',
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            // name: '',
                            type: 'pie',
                            radius: '60%',
                            data: videoData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.$echarts.getChart("pie-chart", pieOption);
            }

        }, err => {
            console.log(err);
        })
    },
    mounted() {
    },
};
</script>

<style lang="less" scoped>
.el-row::after,
.el-row::before {
    content: none;
}

.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }

        .user-info {
            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }

            .access {
                color: #999999;
            }
        }
    }

    .login-info {
        p {
            padding-left: 20px;
            text-align: left;
            line-height: 28px;
            font-size: 14px;
            color: #999999;

            span {
                color: #666666;
                margin-left: 40px;
            }
        }
    }

    .order {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
            border: none;
        }

        .icon {
            font-size: 30px;
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px;
            }

            .txt {
                font-size: 14px;
                text-align: center;
                color: #999999;
            }
        }
    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 48%;
        }
    }
}
</style>