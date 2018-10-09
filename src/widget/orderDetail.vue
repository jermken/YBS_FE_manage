<template>
    <el-dialog :visible.sync="dialogShow" :close-on-click-modal="false" :title="`${config.title}详情`" width="1240px" :before-close="beforeClose" @close="resetFields">
        <div class="user-info-wrapper">
            <span class="payment-title">客户信息</span>
                <el-form :model="userInfo" status-icon :rules="formRules" label-suffix="：" inline ref="userInfoForm" :size="globalSize" label-width="90px">
                    <el-form-item label="客户类别">
                        <el-radio-group v-model="userInfo.userType">
                            <el-radio label="1">游客</el-radio>
                            <el-radio label="2">客户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="游客姓名" v-if="userInfo.userType == 1">
                        <el-input v-model="userInfo.name" placeholder="请输入游客姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="美容师" v-if="userInfo.userType == 1">
                        <el-select v-model="userInfo.server" :size="globalSize" filterable placeholder="请选择美容师">
                            <el-option v-for="item in testServer" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户姓名" v-else>
                        <el-input v-model="userInfo.name" placeholder="请输入客户姓名"></el-input>
                        <span v-if="userInfo.info.isVip" class="vip-tips">（会员）</span>
                    </el-form-item>
                    <el-form-item label="卡内余额" v-if="userInfo.userType == 2 && userInfo.info.isVip">
                        <el-input disabled></el-input>
                    </el-form-item>
                    <el-form-item label="赠送金额" v-if="userInfo.userType == 2 && userInfo.info.isVip">
                        <el-input disabled></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="userInfo.desc" :rows="2" :autosize="false"></el-input>
                    </el-form-item>
                </el-form>
        </div>
        <div class="order-wrapper">
            <span class="payment-title">消费明细</span>
            <span class="add-project-wrapper">
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addGoods">商品出售</el-button>
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addProject">项目服务</el-button>
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addSetMeal">套餐项目</el-button>
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addSetProject">自定义项目</el-button>
            </span>
            <el-table  border :size="globalSize" :data="orderList" style="width: 100%;margin-top: 10px;" max-height="330">
                <el-table-column prop="type" label="项目类别" width="200">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.name" :size="globalSize" filterable v-if="scope.row.type == 'goods'" placeholder="请输入商品名称">
                            <el-option></el-option>
                        </el-select>
                        <el-select v-model="scope.row.name" :size="globalSize" filterable v-if="scope.row.type == 'project'" placeholder="请输入项目名称">
                            <el-option></el-option>
                        </el-select>
                        <el-select v-model="scope.row.name" :size="globalSize" filterable v-if="scope.row.type == 'set_meal'" placeholder="请输入套餐项目">
                            <el-option></el-option>
                        </el-select>
                        <el-input v-model="scope.row.name" :size="globalSize" v-if="scope.row.type == 'set_project'" placeholder="请输入自定义项目"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.price" :size="globalSize" placeholder="请输入价格"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="数量" width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.num" :size="globalSize" placeholder="请输入数量"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="server" label="美容师" width="200">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.server" :size="globalSize" filterable placeholder="请选择美容师">
                            <el-option v-for="item in testServer" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="percent" label="比例设置" width="380">
                    <template slot-scope="scope">
                        <div>
                        <div v-if="scope.row.percent">
                            <el-select :size="globalSize" v-model="scope.row.percent.names" filterable placeholder="请选择美容师" multiple style="width:55%!important;">
                                <el-option :disabled="scope.row.percent.names.length == 2" v-for="item in testServer" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                            <el-input maxlength="1" :size="globalSize" style="width:15% !important;" v-model="scope.row.percent.num[0]"></el-input>
                            <span>/</span>
                            <el-input maxlength="1" :size="globalSize" style="width:15% !important;" v-model="scope.row.percent.num[1]"></el-input>
                            <el-button @click="deletePercent(scope.$index)" icon="el-icon-delete" circle :size="globalSize"></el-button>
                        </div>
                        <div v-else>
                            <el-button icon="el-icon-edit" @click="setPercent(scope.$index)" :size="globalSize" type="primary" plain round>设置</el-button>
                        </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-remove"
                            circle
                            :size="globalSize"
                            @click="deleteItem(scope.$index)"
                            >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer">
            <el-button @click="cancelEvent">取消</el-button>
            <el-button type="primary" :disabled="!orderList.length" icon="el-icon-edit-outline" @click="saveOrder">保存订单</el-button>
            <el-button type="warning" :disabled="!orderList.length" icon="el-icon-date" @click="payment">结账</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    // 订单详情组件
    name: 'OrderDetailDialog',
    props: {
        config: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            testServer: [{
                id: 1,
                name: '小李'
            },{
                id: 2,
                name: '小张'
            },{
                id: 3,
                name: '小欧'
            }],
            formRules: {

            }
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.config.visible
        },
        userInfo: function() {
            console.log(this.config.order.userInfo, 88888888)
            return this.config.order.userInfo
        },
        orderList: function() {
            return this.config.order.orderList
        }
    },
    watch: {
    },
    methods: {
        beforeClose() {
            this.$emit('closed')
        },
        resetFields() {
            
        },
        addGoods() {

        },
        addProject() {

        },
        addSetMeal() {

        },
        addSetProject() {

        },
        deleteItem() {

        },
        cancelEvent() {
            this.$emit('closed')
        },
        saveOrder() {
            let localOrder = {
                userInfo: this.userInfo,
                orderList: this.orderList,
                date: +new Date()
            }
            let local_order = (localStorage.getItem('local_order') && JSON.parse(localStorage.getItem('local_order'))) || []
            let idx = local_order.findIndex((item) => item.date === this.config.order.date)
            if (idx > -1) {
                local_order.splice(idx, 1, localOrder)
            }
            localStorage.setItem('local_order',JSON.stringify(local_order))
            this.$notify({
                title: '保存成功！',
                type: 'success'
            })
            // 更新未支付订单列表
            this.$emit('closed', true)
        },
        payment(order) {
            // TODO: 付款操作
            if (order) {
                console.log(order)
            }
        }
    }
}
</script>