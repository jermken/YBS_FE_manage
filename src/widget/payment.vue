<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="请确认账单信息是否有误" width="500px" :before-close="beforeClose" @close="resetFields('paymentForm')">
    <el-form :model="paymentInfo" status-icon :rules="formRules" ref="paymentForm" :size="globalSize">
        <el-form-item label="顾客" label-width="100px" prop="name">
            <el-input v-model="paymentInfo.userInfo.name" disabled style="width: 50%!important;"></el-input>
        </el-form-item>
        <el-form-item label="账单类别" label-width="100px" prop="paymentType">
            <el-tag type="success">{{paymentType[type]}}</el-tag>
        </el-form-item>
        <el-form-item label="账单总金额" label-width="100px" prop="total">
            <el-input v-model="paymentInfo.total" disabled style="width: 50%!important;"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'project'" label="扣卡金额" label-width="100px" prop="card_minu">
            <el-input v-model="paymentInfo.card_minu" style="width: 50%!important;"></el-input>
        </el-form-item>
        <el-form-item required label="实收金额" label-width="100px" prop="pay_amount">
            <el-input v-model="paymentInfo.pay_amount" placeholder="请输入需支付金额" style="width: 50%!important;"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'recharge' || type === 'card'" required label="赠送金额" label-width="100px" prop="present_amount">
            <el-input v-model="paymentInfo.present_amount" placeholder="请输入需支付金额" style="width: 50%!important;"></el-input>
        </el-form-item>
        <el-form-item label="未付金额" label-width="100px" prop="no_pay">
            <el-input v-model="paymentInfo.no_pay" placeholder="请输入需支付金额" style="width: 50%!important;"></el-input>
        </el-form-item>
        <el-form-item required label="付款方式" label-width="100px" prop="pay_type">
            <el-select v-model="paymentInfo.pay_type" filterable placeholder="请选择支付方式" multiple>
                <el-option v-for="item in payType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('paymentForm')" :size="globalSize" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    // 结账弹窗组件
    name: 'Payment',
    props: {
        show: false,
        type: '',
        info: {}
    },
    data() {
        return {
            paymentInfo: {
                orderList: [],
                userInfo: {},
                pay_type: [],
                card_minu: '',
                pay_amount: '',
                no_pay: '',
                total: ''
            },
            paymentType: {
                project: '商品或服务',
                card: '开卡',
                recharge: '充值'
            },
            formRules:{
                pay_amount: [{
                    required: true,
                    message: '收款金额必填（数字）',
                    trigger: 'blur'
                }],
                pay_type: [{
                    required: true,
                    message: '付款方式必选',
                    trigger: 'change'
                }]
            },
            payType: [{
                label: '微信',
                value: 'wechat'
            },{
                label: '支付宝',
                value: 'alipay'
            },{
                label: '现金',
                value: 'cash'
            },{
                label: '银行卡',
                value: 'bankCard'
            },{
                label: '扣卡',
                value: 'cardMinu'
            }]
        }
    },
    watch: {
        'info': function(obj) {
            this.paymentInfo = Object.assign({}, this.paymentInfo, obj)
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        cancelEvent() {
            this.$emit('closed')
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    // TODO: 新增或修改卡类信息
                    alert('success')
                    this.$emit('closed', true)
                } else {
                    return false
                }
            })
        },
        beforeClose() {
            this.$emit('closed')
        },
        resetFields(ref) {
            this.$refs[ref].resetFields()
        }
    },
    mounted() {
        // TODO: 拉取卡类列表
    }
}
</script>