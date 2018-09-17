<template>
    <div class="inline-staff">
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix=":" size="mini" :mode="queryInfo">
                <el-form-item label="姓名">
                    <el-input v-model="queryInfo.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input  v-model="queryInfo.staffCode" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addStaff" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border size="mini" :data="tableData" style="width: 100%;">
                <el-table-column prop="name" label="姓名" width="220"></el-table-column>
                <el-table-column  prop="sexual" label="性别" width="220">
                    <template slot-scope="scope">
                        <span>{{scope.row.sexual === '1' ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="birthday" label="出生日期" width="250"></el-table-column>
                <el-table-column  prop="role" label="角色" width="220">
                    <template slot-scope="scope">
                        <span>{{role[scope.row.role]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editorStaff(scope.row)" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteStaff(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="tableData.length"
                    :page-size="pageSize"
                    :pager-count="7"
                    :current-page="page"
                    @current-change="pageChangeEvent">
                </el-pagination>
            </div>
            <staff-info-dialog :staffId.sync="staffId" :show.sync="staffInfoDialogVisible" @closed="closeStaffInfoDialog"></staff-info-dialog>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import staffInfoDialog from '@/widget/staffInfo'

export default {
    name: 'InlineStaff',
    components: {
        staffInfoDialog
    },
    data() {
        return {
            staffId: null,
            role: {
                staff: '员工',
                manager: '店长',
                boss: '老板'
            },
            tableData: [{
                name: 'jermken1',
                sexual: '1',
                birthday: '1993-09-08',
                role: 'staff',
                id: '111'
            },{
                name: 'jermken2',
                sexual: '2',
                birthday: '1993-09-03',
                role: 'manager',
                id: '222'
            },{
                name: 'jermken3',
                sexual: '2',
                birthday: '1993-02-03',
                role: 'boss',
                id: '333'
            }],
            pageSize: 2,
            page: 1,
            queryInfo: {
                name: '',
                staffCode: '',
                status: 1
            },
            staffInfoDialogVisible: false
        }
    },
    methods: {
        queryData() {
            let params = {
                ...this.queryInfo,
                page: 1,
                pageSize: this.pageSize
            }
            this.fetchData(params).then(()=> {
                this.page = 1
            })
        },
        pageChangeEvent(page) {
            let params = {
                page,
                pageSize: this.pageSize,
                name: '',
                staffCode: '',
                status: 1
            }
            this.fetchData(params)
        },
        async fetchData(obj) {
            let params = obj || {
                ...this.queryInfo,
                page: 1,
                pageSize: this.pageSize
            }
            console.log(params)
            // TODO: 拉取在职员工列表
        },
        addStaff() {
            this.staffInfoDialogVisible = true
            this.staffId = null
        },
        editorStaff(row) {
            this.staffInfoDialogVisible = true
            this.staffId = row.id
        },
        deleteStaff() {
            // TODO: 删除员工
            MessageBox.confirm('确认删除此员工', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                MessageBox({
                    type: 'success',
                    message: '删除成功'
                })
            }).catch(() => {
            })
        },
        closeStaffInfoDialog(isUpdate) {

            this.staffInfoDialogVisible = false
            isUpdate && this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>
<style lang="scss">

</style>