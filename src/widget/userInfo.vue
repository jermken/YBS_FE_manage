<template>
<el-dialog :close-on-click-modal="false" :visible.sync="show" title="客户信息" width="600px" @close="beforeClose">
    <el-form :model="userInfo" status-icon :rules="formRules" ref="userInfoForm" :size="globalSize">
        <el-form-item required label="姓名" label-width="80px" prop="name">
            <el-input placeholder="请输入姓名" width="60%" v-model="userInfo.name" :disabled="!!userInfo.id"></el-input>
        </el-form-item>
        <el-form-item required label="性别" label-width="80px" prop="sexual">
            <el-radio-group v-model="userInfo.sexual">
                <el-radio label="1">女</el-radio>
                <el-radio label="2">男</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item required label="会员" label-width="80px" prop="is_vip">
            <el-radio-group v-model="userInfo.is_vip" disabled>
                <el-radio :label="1" disabled>是</el-radio>
                <el-radio :label="2" disabled>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item required label="生日" label-width="80px" prop="birthday">
            <el-date-picker type="date" v-model="userInfo.birthday" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item required label="联系方式" label-width="80px" prop="tell">
            <el-input placeholder="请输入手机号" width="60%" v-model="userInfo.tell"></el-input>
        </el-form-item>
        <el-form-item required label="卡内余额" label-width="80px" prop="card_amount">
            <el-input placeholder="请输入余额" width="60%" disabled v-model="userInfo.card_amount"></el-input>
        </el-form-item>
        <el-form-item required label="赠送金额" label-width="80px" prop="present_amount">
            <el-input placeholder="请输入赠送金额" width="60%" disabled v-model="userInfo.present_amount"></el-input>
        </el-form-item>
        <el-form-item required label="积分" label-width="80px" prop="points">
            <el-input placeholder="请输入积分" width="60%" disabled v-model="userInfo.points"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="remark">
            <el-input type="textarea" v-model="userInfo.remark" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('userInfoForm')" :size="globalSize" type="primary" :loading="loading">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    // 用户信息弹窗组件
    name: 'UserInfo',
    mixins: [loader],
    data() {
        return {
            show: false,
            loading: false,
            userInfo: {
                name: '',
                sexual: '1',
                is_vip: 2,
                birthday: '',
                tell: '',
                card_amount: 0,
                present_amount: 0,
                consume_total: 0,
                consume_times: 0,
                status: 1,
                points: 0,
                cards: '[]',
                setmeal: '[]',
                remark: ''
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
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchUserInfo(id) {
            this.get('getUserDetail', {id}).then(res => {
                if (!res.code) {
                    this.userInfo = res.data
                }
            })
        },
        open(id, type) {
            this.show = true
            id && this.fetchUserInfo(id)
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
                    this.loading = true
                    let api = 'addUserList'
                    if (this.userInfo.id) {
                        api = 'updateUser'
                    }
                    this.post(api, this.userInfo).then(res => {
                        if (!res.code) {
                            this.$message({
                                type: 'success',
                                message: this.userInfo.id ? '修改成功' : '添加成功'
                            })
                            this.$emit('closed', true)
                            this.close()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        },
        beforeClose() {
            this.userInfo = {
                name: '',
                sexual: '1',
                is_vip: 2,
                birthday: '',
                tell: '',
                card_amount: 0,
                present_amount: 0,
                consume_total: 0,
                consume_times: 0,
                status: 1,
                points: 0,
                cards: '[]',
                setmeal: '[]',
                remark: ''
            }
            this.show = false
            this.$refs.userInfoForm.resetFields()
        }
    }
}
</script>