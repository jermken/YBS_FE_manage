<template>
<el-dialog :visible.sync="dialogShow" title="员工信息" width="500px">
    <el-form :model="staffInfo">
        <el-form-item label="姓名" label-width="80px">
            <el-input placeholder="请输入姓名" width="60%" v-model="staffInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="80px">
            <el-radio-group v-model="staffInfo.sexual">
                <el-radio label="1">女</el-radio>
                <el-radio label="2">男</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" label-width="80px">
            <el-date-picker type="date" v-model="staffInfo.birthday" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="角色" label-width="80px">
            <el-select v-model="staffInfo.role">
                <el-option v-for="item in roleArr" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" size="mini">取消</el-button>
        <el-button @click="confirmEvent" size="mini" type="primary">确定</el-button>
    </span>
</el-dialog>
</template>
<script>
export default {
    name: 'StaffInfo',
    props: {
        staffId: '',
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
                role: ''
            }
        }
    },
    computed: {
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        cancelEvent() {
            this.$emit('closeStaffInfoDialog')
        },
        confirmEvent() {
            this.$emit('closeStaffInfoDialog')
        }
    }
}
</script>