<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="员工信息" width="500px" :before-close="beforeClose" @close="resetFields('staffInfoForm')">
    <el-form :model="staffInfo" status-icon :rules="formRules" ref="staffInfoForm" :size="globalSize">
        <el-form-item required label="姓名" label-width="80px" prop="name">
            <el-input :disabled="staffId" placeholder="请输入姓名" width="60%" v-model="staffInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="联系方式" label-width="80px" prop="tell">
            <el-input placeholder="请输入手机号" width="60%" v-model="staffInfo.tell"></el-input>
        </el-form-item>
        <el-form-item required label="性别" label-width="80px" prop="sexual">
            <el-radio-group v-model="staffInfo.sexual">
                <el-radio label="1">女</el-radio>
                <el-radio label="2">男</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item required label="生日" label-width="80px" prop="birthday">
            <el-date-picker type="date" v-model="staffInfo.birthday" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item required label="角色" label-width="80px" prop="role">
            <el-select v-model="staffInfo.role">
                <el-option v-for="item in roleArr" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item required label="状态" label-width="80px" prop="status">
            <el-radio-group v-model="staffInfo.status">
                <el-radio :label="1">在职</el-radio>
                <el-radio :label="0">离职</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('staffInfoForm')" :size="globalSize" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'
import moment from 'moment'
import utils from '@/utils/index'

export default {
    // 员工信息详情组件
    name: 'StaffInfo',
    mixins: [loader],
    props: {
        staffId: null,
        show: false
    },
    data() {
        let validTell = (rule, value, cb) => {
            if (utils.isValidateTell(value)) {
                cb()
            } else {
                cb(new Error('手机号格式有误'))
            }
        }
        return {
            roleArr: [{
                label: '员工',
                value: 'staff'
            },{
                label: '店长',
                value: 'manager'
            },{
                label: '老板',
                value: 'boss'
            }],
            staffInfo: {
                name: '',
                sexual: '',
                birthday: '',
                role: '',
                status: '',
                tell: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                tell: [{
                    validator: validTell,
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
                role: [{
                    required: true,
                    message: '请选择角色',
                    trigger: 'change'
                }],
                status: [{
                    required: true,
                    message: '请选择在职状态',
                    trigger: 'change'
                }]
            }
        }
    },
    watch: {
        'staffId': function(val) {
            val && this.fetchStaffInfo(val)
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        async fetchStaffInfo(id) {
            console.log(id, 'staff detail id')
            this.get('getStaffList', {
                id
            }).then((res) => {
                if(!res.code) {
                    console.log(res, 'staff detail info')
                    this.staffInfo = res.data[0]
                } else {
                    this.$msgbox({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        cancelEvent() {
            this.$emit('closed')
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let now = moment().format('YYYY-MM-DD HH:mm:ss')
                    if (this.staffId) {
                        this.post('updateStaff',{
                            id: this.staffId,
                            ...this.staffInfo,
                            update_time: now
                        }).then((res) => {
                            if(!res.code) {
                                this.$emit('closed', true)
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                })
                            } else {
                                this.$msgbox({
                                    message: res.msg,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        this.post('addStaff',{
                            ...this.staffInfo,
                            create_time: now,
                            update_time: now
                        }).then((res) => {
                            if (!res.code) {
                                this.$emit('closed', true)
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                })
                            } else {
                                this.$msgbox({
                                    message: res.msg,
                                    type: 'error'
                                })
                            }
                        })
                    }
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