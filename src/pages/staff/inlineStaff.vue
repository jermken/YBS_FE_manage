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
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border size="mini" :data="tableData">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column  prop="sexual" label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sexual === '1' ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="birthday" label="出生日期"></el-table-column>
                <el-table-column  prop="role" label="角色">
                    <template slot-scope="scope">
                        <span>{{role[scope.row.role]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editorEvent" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteEvent">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
                <el-pagination 
                    background
                    layout="prev, pager, next"
                    :total="tableData.length"
                    :page-size="pageSize"
                    :pager-count="11"
                    :current-page="page"
                    @current-change="pageChangeEvent">
                </el-pagination>
            </div>
            <staff-info-dialog :show.sync="staffInfoDialogVisible" @closeStaffInfoDialog="staffInfoDialogVisible = false"></staff-info-dialog>
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
            role: {
                staff: '员工',
                manager: '店长',
                boss: '老板'
            },
            tableData: [{
                name: 'jermken1',
                sexual: '1',
                birthday: '1993-09-08',
                role: 'staff'
            },{
                name: 'jermken2',
                sexual: '2',
                birthday: '1993-09-03',
                role: 'manager'
            },{
                name: 'jermken3',
                sexual: '2',
                birthday: '1993-02-03',
                role: 'boss'
            }],
            pageSize: 2,
            page: 1,
            queryInfo: {
                name: '',
                staffCode: ''
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
                this.page = 1;
            })
        },
        pageChangeEvent(obj) {
            let params = {
                page,
                pageSize: this.pageSize,
                name: '',
                staffCode: ''
            }
            this.fetchData(params)
        },
        async fetchData(params) {
            console.log(params)
            // TODO: 拉取在职员工列表
        },
        editorEvent() {
            // TODO: 编辑员工
            this.staffInfoDialogVisible = true
        },
        deleteEvent() {
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
        }
    },
    mounted() {
        let params = {
            ...this.queryInfo,
            page: 1,
            pageSize: this.pageSize
        }
        this.fetchData(params)
    }
}
</script>
<style lang="scss">

</style>