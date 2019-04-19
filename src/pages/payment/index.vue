<template>
    <div class="payment-page">
        <div class="payment-page-top">
            <div class="payment-page-top__left">
                <span class="payment-title">客户信息</span>
                <el-form :model="billInfo" status-icon :rules="formRules" ref="userInfoForm" :size="globalSize" label-width="80px">
                    <el-form-item label="客户类别">
                        <el-radio-group v-model="billInfo.user_type" @change="onUserTypeChange">
                            <el-radio label="1">游客</el-radio>
                            <el-radio label="2">客户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="游客姓名" v-if="billInfo.user_type == '1'">
                        <el-input v-model="billInfo.user_info.name" placeholder="请输入游客姓名" style="width:60% !important;"></el-input>
                    </el-form-item>
                    <el-form-item label="客户姓名" v-else>
                        <el-select v-model="billInfo.info" filterable remote :remote-method="fetchUserList" placeholder="请输入客户姓名">
                            <el-option v-for="item in userList" :key="item.id" :label="itme.name" :value="item"></el-option>
                        </el-select>
                        <span v-if="billInfo.user_info.isVip" class="vip-tips">（会员）</span>
                    </el-form-item>
                    <el-form-item label="美容师">
                        <el-select v-model="billInfo.server_info" filterable remote :remote-method="fetchServerList" placeholder="请输入美容师姓名">
                            <el-option v-for="item in serverList" :key="item.id" :label="item.name" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="billInfo.remark" :rows="2" :autosize="false"></el-input>
                    </el-form-item>
                    <el-form-item label="卡内余额" :class="{'dis-visible': !billInfo.user_info.is_vip}">
                        <el-input disabled v-model="billInfo.user_info.card_amount"></el-input>
                    </el-form-item>
                    <el-form-item label="赠送金额" :class="{'dis-visible': !billInfo.user_info.is_vip}">
                        <el-input disabled v-model="billInfo.user_info.present_amount"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="payment-page-top__right">
                <span class="payment-title">未支付订单</span>
                <el-table border :size="globalSize" :data="localOrderList" style="width: 100%;margin-top: 10px;" height="300px">
                    <el-table-column label="客户姓名" width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.userInfo.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开单时间" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="主美容师" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.userInfo.server}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单总金额" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.total}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" plain :size="globalSize" @click="deleteUnPayOrder(scope.row)">删除</el-button>
                            <el-button type="primary" :size="globalSize" @click="showUnPayOrderDetail(scope.row)">详情</el-button>
                            <el-button type="warning" :size="globalSize" @click="payment(scope.row)">结账</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="payment-page-bottom">
            <span class="payment-title">消费明细</span>
            <span class="add-project-wrapper">
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addProject">项目服务</el-button>
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addGoods">商品出售</el-button>
                <el-button :size="globalSize" type="primary" icon="el-icon-plus" @click="addSetMeal" :disabled="billInfo.user_type == '1'">套餐项目</el-button>
                <el-button :size="globalSize" type="primary" round @click="buyCard" :disabled="!(billInfo.user_info.name && billInfo.server_info.name)">开卡服务</el-button>
            </span>
            <el-table  border :size="globalSize" :data="consumeData" style="width: 100%;margin-top: 10px;" max-height="330">
                <el-table-column prop="type" label="项目类别" width="200">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.name" :size="globalSize" filterable v-if="scope.row.type == 'goods'" placeholder="请输入商品名称">
                            <el-option></el-option>
                        </el-select>
                        <el-input v-model="scope.row.name" :size="globalSize" v-if="scope.row.type == 'project'" placeholder="请输入项目名称"></el-input>
                        <el-select v-model="scope.row.name" :size="globalSize" filterable v-if="scope.row.type == 'set_meal'" placeholder="请输入套餐项目">
                            <el-option></el-option>
                        </el-select>
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
                            <el-option v-for="item in serverList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="percent" label="比例设置" width="380">
                    <template slot-scope="scope">
                        <div>
                        <div v-if="scope.row.percent">
                            <el-select :size="globalSize" v-model="scope.row.percent.names" filterable placeholder="请选择美容师" multiple style="width:55%!important;">
                                <el-option :disabled="scope.row.percent.names.length == 2" v-for="item in serverList" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
            <div class="order-action-wrapper">
                <el-button type="primary" :disabled="!consumeData.length" icon="el-icon-edit-outline" @click="saveOrder">保存订单</el-button>
                <el-button type="warning" :disabled="!consumeData.length" icon="el-icon-date" @click="payment">结账</el-button>
            </div>
        </div>
        <order-detail-dialog :config="orderDetailConf" @closed="closeOrderDetailDialog"/>
        <buy-card-dialog @closed="closeBuyCardDialog" @topayment="showPaymentDialog"/>
        <payment-dialog @closed="closePaymentDialog" :type="paymentType"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'
import OrderDetailDialog from '@/widget/orderDetail'
import buyCardDialog from '@/widget/buyCard'
import paymentDialog from '@/widget/payment'

export default {
    name: 'Payment',
    components: {
        OrderDetailDialog,
        buyCardDialog,
        paymentDialog
    },
    mixins: [loader],
    data() {
        return {
            billInfo: {
                user_type: '1',
                remark: '',
                server_info: {},
                user_info: {}
            },
            formRules: {

            },
            consumeData: [],
            localOrderList: [],
            serverList: [],
            goodsList: [],
            userList: [],
            orderDetailConf: {
                visible: false,
                order: {
                    userInfo: {
                        info: {}
                    },
                    orderList: []
                },
                title: null
            },
            buyCardConfVisible: false,
            paymentVisible: false,
            paymentInfo: {},
            paymentType: ''
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        fetchServerList(name) {
            this.get('getStaffList',{status: 1, page: 1, pageSize: 5, name}).then(res => {
                if (!res.code) {
                    this.serverList = res.data
                }
            })
        },
        fetchGoodsList(name) {
            this.get('getGoodsList',{status: 1, page: 1, pageSize: 5, name}).then(res => {
                if (!res.code) {
                    this.goodsList = res.data
                }
            })
        },
        fetchUserList(name) {
            this.get('getUserList',{status: 1, page: 1, pageSize: 5, name}).then(res => {
                if (!res.code) {
                    this.userList = res.data
                }
            })
        },
        onUserTypeChange() {
            if (this.consumeData.length) {
                this.consumeData = []
            }
        },
        addGoods() {
            this.consumeData.push({
                type: 'goods',
                price: '',
                num: '',
                server: ''
            })
        },
        addProject() {
            this.consumeData.push({
                type: 'project',
                price: '',
                num: '',
                server: ''
            })
        },
        addSetMeal() {
            this.consumeData.push({
                type: 'set_meal',
                price: '',
                num: '',
                server: ''
            })
        },
        // 开卡
        buyCard() {
            this.buyCardConfVisible = true
            this.paymentType = 'card'
        },
        // 充值
        recharge() {
            this.paymentType = 'recharge'
        },
        deleteItem(idx) {
            this.consumeData.splice(idx, 1)
        },
        setPercent(idx) {
            this.consumeData[idx].percent = {
                names: [],
                num: []
            }
            // 更改列表中的小部分数据而没有更改table data 的长度 不会引起重新渲染  所以直接更改data的内存地址
            this.consumeData = JSON.parse(JSON.stringify(this.consumeData))
        },
        deletePercent(idx) {
            delete this.consumeData[idx].percent
            // 更改列表中的小部分数据而没有更改table data 的长度 不会引起重新渲染  所以直接更改data的内存地址
            this.consumeData = JSON.parse(JSON.stringify(this.consumeData))
        },
        saveOrder() {
            let total = 0
            for(let i = 0; i < this.consumeData.length; i++) {
                total += this.consumeData[i].price * this.consumeData[i].num
            }
            let localOrder = {
                userInfo: this.userInfo,
                orderList: this.consumeData,
                date: +new Date(),
                total: total
            }
            let local_order = (localStorage.getItem('local_order') && JSON.parse(localStorage.getItem('local_order'))) || []
            local_order.push(localOrder)
            localStorage.setItem('local_order',JSON.stringify(local_order))
            this.$notify({
                title: '保存成功！',
                type: 'success'
            })
            this.$refs.userInfoForm && this.$refs.userInfoForm.resetFields()
            this.consumeData = []
            // 更新未支付订单列表
            this.updateLocalOrder()
        },
        payment(order) {
            // TODO: 付款操作
            if (order) {
                this.paymentInfo = order
            } else {
                let total = 0
                for(let i = 0; i < this.consumeData.length; i++) {
                    total += this.consumeData[i].price * this.consumeData[i].num
                }
                this.paymentInfo = {userInfo: this.userInfo, orderList: this.consumeData, date: +new Date(), total: total}
            }
            this.paymentType = 'project'
            this.showPaymentDialog()
        },
        updateLocalOrder() {
            let data = (localStorage.getItem('local_order') && JSON.parse(localStorage.getItem('local_order'))) || []
            this.localOrderList = data
        },
        showUnPayOrderDetail(row) {
            this.orderDetailConf = { title: '未支付订单', visible: true, order: row }
        },
        deleteUnPayOrder(row) {
            let local_order = (localStorage.getItem('local_order') && JSON.parse(localStorage.getItem('local_order'))) || []
            let idx = local_order.findIndex((item) => item.date === row.date)
            if (idx > -1) {
                local_order.splice(idx, 1)
                localStorage.setItem('local_order',JSON.stringify(local_order))
                this.updateLocalOrder()
            }
        },
        closeOrderDetailDialog(update) {
            this.orderDetailConf.visible = false
            update && this.updateLocalOrder()
        },
        closeBuyCardDialog(update) {
            this.buyCardConfVisible = false
            update && this.updateLocalOrder()
        },
        showPaymentDialog() {
            this.paymentVisible = true
        },
        closePaymentDialog(update) {
            this.paymentVisible = false
            update && console.log(1111)
        }
    },
    mounted() {
        // 拉取本地保存订单列表
        this.updateLocalOrder()
    }
}
</script>
<style lang="scss">
@import '@/scss/variable.scss';
.payment-title {
    color: #fea980;
    font-size: 18px;
    font-weight: bold;
}
.payment-page-top {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
}
.payment-page-top__left {
    background: #e8f2fc;
    border-radius: 4px;
    width: 40%;
    padding: 10px;
    box-sizing: border-box;
    margin-right: 20px;
}
.payment-page-top__right {
    border-radius: 4px;
    width: 60%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
}
.payment-page-bottom {
    border-radius: 4px;
    background: #e8f2fc;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
}
.dis-visible {
    visibility: hidden;
}
.vip-tips {
    color: $themeWarnColor;
}
.order-action-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>