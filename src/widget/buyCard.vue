<template>
<el-dialog :close-on-click-modal="false" :visible.sync="show" title="卡类信息" width="500px" :before-close="beforeClose" @close="resetFields('buyCardForm')">
    <el-form :model="cardInfo" status-icon :rules="formRules" ref="buyCardForm" :size="globalSize" label-width="80px">
        <el-form-item label="客户类别">
            <el-radio-group v-model="billInfo.userType" @change="onUserTypeChange">
                <el-radio label="1">新客户</el-radio>
                <el-radio label="2">老客户</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="客户姓名" prop="userName">
            <el-input disabled width="60%" v-if="billInfo.userType == 1" v-model="billInfo.userName"></el-input>
            <el-select v-model="billInfo.userName" v-else :size="globalSize" filterable placeholder="请输入客户名">
                <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item required label="卡类名称" prop="name">
            <el-select v-model="billInfo.cardName" :size="globalSize" filterable placeholder="请输入卡类名称" @change="selectCard">
                <el-option v-for="item in cardList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="卡类价格" prop="price">
            <el-input disabled width="60%" v-model="billInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额" prop="presentPrice">
            <el-input disabled width="60%" v-model="billInfo.presentPrice"></el-input>
        </el-form-item>
        <el-form-item required label="会员" label-width="80px" prop="is_vip">
            <el-radio-group v-model="billInfo.is_vip" disabled>
                <el-radio :label="1" disabled>是</el-radio>
                <el-radio :label="2" disabled>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item required label="美容师" prop="serverName">
            <el-select v-model="billInfo.serverName" :size="globalSize" filterable placeholder="请选择美容师" @change="selectCard">
                <el-option v-for="item in serverList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="实收金额" prop="payment">
            <el-input v-model="billInfo.payment" placeholder="请输入需支付金额"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('buyCardForm')" :size="globalSize" type="primary" :loading="loading">结账</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'BuyCard',
    data() {
        return {
            show: false,
            loading: false,
            billInfo: {
                userType: '1',
                userName: '',
                userId: '',
                cardName: '',
                cardId: '',
                cardPrice: '',
                price: '',
                cardPrice: '',
                is_vip:1,
                payment: ''
            },
            userList: [],
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
            cardList: [],
            serverList: []
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        cancelEvent() {
            this.close()
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let params = { ...this.billInfo }
                    this.post('', this.billInfo).then(res => {
                        if (!res.code) {
                            
                        }
                    })
                } else {
                    return false
                }
            })
        },
        beforeClose() {
            this.close()
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

    }
}
</script>