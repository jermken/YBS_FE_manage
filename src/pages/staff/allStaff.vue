<template>
    <div class="all-staff">
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
                <el-form-item label="姓名">
                    <el-input v-model="queryInfo.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input  v-model="queryInfo.id" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                    <el-button @click="clearQuery">清除</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addStaff" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="id" label="工号" width="120"></el-table-column>
                <el-table-column prop="name" label="姓名" width="150"></el-table-column>
                <el-table-column  prop="sexual" label="性别" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.sexual === '1' ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="tell" label="联系方式" width="150"></el-table-column>
                <el-table-column  prop="birthday" label="出生日期" width="200"></el-table-column>
                <el-table-column  prop="role" label="角色" width="150">
                    <template slot-scope="scope">
                        <span>{{role[scope.row.role]}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="status" label="状态" width="150">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 1? 'success' : 'info'">{{scope.row.status === 1 ? '在职' : '离职'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editorStaff(scope.row.id)" :size="globalSize">编辑</el-button>
                        <el-button type="text" :size="globalSize" @click="deleteStaff(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper" v-if="total">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="queryInfo.pageSize"
                    :current-page="queryInfo.page"
                    @current-change="pageChangeEvent">
                </el-pagination>
            </div>
            <staff-info-dialog ref="staffInfo" @closed="closeStaffInfoDialog"></staff-info-dialog>
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
            role: {
                staff: '员工',
                manager: '店长',
                boss: '老板'
            },
            tableData: [],
            total: 0,
            queryInfo: {
                name: '',
                id: '',
                status: '',
                pageSize: 8,
                page: 1
            }
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        queryData() {
            this.queryInfo.page = 1
            this.fetchData()
        },
        clearQuery() {
            this.queryInfo = {
                name: '',
                id: '',
                status: '',
                page: 1,
                pageSize: 8
            }
            this.fetchData()
        },
        pageChangeEvent(page) {
            this.queryInfo.page = page
            this.fetchData()
        },
        async fetchData(obj) {
            this.get('getStaffList', this.queryInfo).then((res) => {
                if(!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                } else {
                    this.$msgbox({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        addStaff() {
            this.$refs.staffInfo.open()
        },
        editorStaff(id) {
            this.$refs.staffInfo.open(id)
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