<template>
<el-dialog :visible.sync="dialogShow" title="客户信息" width="600px" :before-close="beforeClose" @close="resetFields('userInfoForm')">
    <el-form :model="userInfo" status-icon :rules="formRules" ref="userInfoForm" :size="globalSize">
        <el-form-item required label="姓名" label-width="80px" prop="name">
            <el-input placeholder="请输入姓名" width="60%" v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="性别" label-width="80px" prop="sexual">
            <el-radio-group v-model="userInfo.sexual">
                <el-radio label="1">女</el-radio>
                <el-radio label="2">男</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="config.userId && !config.canEditor" required label="会员" label-width="80px" prop="isVip">
            <el-radio-group v-model="userInfo.isVip">
                <el-radio label="1" disabled>是</el-radio>
                <el-radio label="2" disabled>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item required label="生日" label-width="80px" prop="birthday">
            <el-date-picker type="date" v-model="userInfo.birthday" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item required label="联系方式" label-width="80px" prop="tell">
            <el-input placeholder="请输入手机号" width="60%" v-model="userInfo.tell"></el-input>
        </el-form-item>
        <el-form-item v-if="config.isVip" required label="卡内余额" label-width="80px" prop="card_amount">
            <el-input placeholder="请输入余额" width="60%" disabled v-model="userInfo.card_amount"></el-input>
        </el-form-item>
        <el-form-item v-if="config.isVip" required label="赠送金额" label-width="80px" prop="present_amount">
            <el-input placeholder="请输入赠送金额" width="60%" disabled v-model="userInfo.present_amount"></el-input>
        </el-form-item>
        <el-form-item required label="积分" label-width="80px" prop="points">
            <el-input placeholder="请输入积分" width="60%" disabled v-model="userInfo.points"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="desc">
            <el-input type="textarea" v-model="userInfo.desc" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button v-if="config.canEditor" @click="confirmEvent('userInfoForm')" :size="globalSize" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'UserInfo',
    props: {
        config: {
            visible: false,
            userId: null,
            isVip: false,
            canEditor: true
        }
    },
    data() {
        return {
            userInfo: {
                name: '',
                sexual: '',
                isVip: '',
                birthday: '',
                tell: '',
                card_amount: '',
                present_amount: '',
                points: '',
                desc: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                sexual: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'change'
                }],
                birthday: [{
                    required: true,
                    message: '请选择出生日期',
                    trigger: 'blur'
                }],
                tell: [{
                    required: true,
                    message: '请填写手机号码',
                    trigger: 'blur'
                }],
                card_amount: [{
                    required: true,
                    message: '请输入卡内余额',
                    trigger: 'blur'
                }],
                present_amount: [{
                    required: true,
                    message: '请输入赠送金额',
                    trigger: 'blur'
                }],
                points: [{
                    required: false,
                    message: '请输入积分数',
                    trigger: 'blur'
                }]
            }
        }
    },
    watch: {
        'config.userId': function(val) {
            val && this.fetchUserInfo(val)
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.config.visible
        }
    },
    methods: {
        async fetchUserInfo(id) {
            console.log(id)
            // TODO: 拉取客户信息
        },
        cancelEvent() {
            this.$emit('closed')
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    // TODO: 新增或修改客户信息
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
    }
}
</script>