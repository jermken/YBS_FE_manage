<template>
    <div class="inline-staff">
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
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
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
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
                        <el-button type="text" @click="editorStaff(scope.row)" :size="globalSize">编辑</el-button>
                        <el-button type="text" :size="globalSize" @click="deleteStaff(scope.row)">删除</el-button>
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
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    name: 'InlineStaff',
    mixins: [loader],
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
            tableData: [],
            pageSize: 2,
            page: 1,
            queryInfo: {
                name: '',
                id: '',
                status: 1
            },
            staffInfoDialogVisible: false
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
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
                id: '',
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
            console.log(params, 'fetch stafflist params')
            this.get('getStaffList',{
                ...this.queryInfo
            }).then((res) => {
                console.log(res, 'stafflist info')
                if(!res.code) {
                    this.tableData = res.data
                } else {
                    this.$msgbox({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        addStaff() {
            this.staffInfoDialogVisible = true
            this.staffId = null
        },
        editorStaff(row) {
            this.staffInfoDialogVisible = true
            this.staffId = row.id
        },
        deleteStaff(row) {
            MessageBox.confirm('确认删除此员工', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.post('deleteStaff', {
                    id: row.id
                }).then((res) => {
                    if(!res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    } else {
                        this.$msgbox({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            }).catch(() => {
            })
        },
        closeStaffInfoDialog(isUpdate) {
            this.staffInfoDialogVisible = false
            this.staffId = null
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