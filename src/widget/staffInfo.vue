<template>
<el-dialog :visible.sync="dialogShow" title="员工信息" width="500px" :before-close="beforeClose" @close="resetFields('staffInfoForm')">
    <el-form :model="staffInfo" status-icon :rules="formRules" ref="staffInfoForm">
        <el-form-item required label="姓名" label-width="80px" prop="name">
            <el-input placeholder="请输入姓名" width="60%" v-model="staffInfo.name"></el-input>
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
        <el-button @click="cancelEvent" size="mini">取消</el-button>
        <el-button @click="confirmEvent('staffInfoForm')" size="mini" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
export default {
    name: 'StaffInfo',
    props: {
        staffId: null,
        show: false
    },
    data() {
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
                status: ''
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
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        async fetchStaffInfo(id) {
            console.log(id)
            // TODO: 拉取员工信息
        },
        cancelEvent() {
            this.$emit('closed')
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    // TODO: 新增或修改员工信息
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