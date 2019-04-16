<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="卡类信息" width="500px" :before-close="beforeClose" @close="resetFields('buyCardForm')">
    <el-form :model="cardInfo" status-icon :rules="formRules" ref="buyCardForm" :size="globalSize">
        <el-form-item required label="卡类名称" label-width="80px" prop="name">
            <el-select v-model="cardInfo.name" :size="globalSize" filterable placeholder="请输入卡类名称" @change="selectCard">
                <el-option v-for="item in cardList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="cardInfo.price" label="卡类价格" label-width="80px" prop="price">
            <el-input disabled width="60%" v-model="cardInfo.price"></el-input>
        </el-form-item>
        <el-form-item v-if="cardInfo.present_price" label="赠送金额" label-width="80px" prop="price">
            <el-input disabled width="60%" v-model="cardInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="实收金额" label-width="80px" prop="payment">
            <el-input v-model="cardInfo.payment" placeholder="请输入需支付金额"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('buyCardForm')" :size="globalSize" type="primary">结账</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    // 开卡组件
    name: 'BuyCard',
    props: {
        user_id: null,
        server_id: null,
        show: false
    },
    data() {
        return {
            cardInfo: {
                name: '',
                price: '',
                payment: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                payment: [{
                    required: true,
                    message: '请填写实收金额',
                    trigger: 'blur'
                }]
            },
            cardList: [{
                id: 1,
                name: '贵宾卡',
                price: 500
            },{
                id: 2,
                name: '仙女卡',
                price: 1000
            },{
                id: 1,
                name: '女神卡',
                price: 200
            }]
        }
    },
    watch: {
        
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
                    this.$emit('topayment')
                    // this.$emit('closed', true)
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
        },
        selectCard(val) {
            let idx = this.cardList.findIndex((item) => item.id === val)
            this.cardInfo = this.cardList[idx]
        }
    },
    mounted() {
        // TODO: 拉取卡类列表
    }
}
</script>