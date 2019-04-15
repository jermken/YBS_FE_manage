<template>
    <div>
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
                <el-form-item label="注册日期">
                    <el-date-picker type="date" v-model="queryInfo.date" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="客户姓名">
                    <el-input v-model="queryInfo.name" placeholder="请输入客户姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addUser" icon="el-icon-edit" type="primary">新增客户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="create_time" label="注册日期" width="150"></el-table-column>
                <el-table-column  prop="sexual" label="性别" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.sexual === 1 ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="tell" label="手机号" width="100"></el-table-column>
                <el-table-column  prop="tell" label="生日" width="100"></el-table-column>
                <el-table-column  prop="card_amount" label="卡内余额" width="100"></el-table-column>
                <el-table-column  prop="present_amount" label="赠送金额" width="100"></el-table-column>
                <el-table-column  prop="consume_total" label="消费总额" width="100"></el-table-column>
                <el-table-column  prop="consume_times" label="消费次数" width="80"></el-table-column>
                <el-table-column  prop="points" label="积分" width="80"></el-table-column>
                <el-table-column  prop="remark" label="备注" width="120">
                    <template slot-scope="scope">
                        <el-popover :content="scope.row.remark" trigger="hover" width="150" placement="top">
                            <div class="bill-desc" slot="reference">{{scope.row.remark}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column  prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize" @click="showUserInfo(scope.row.id, 'editor')">编辑</el-button>
                        <el-button type="text" :size="globalSize" @click="showUserInfo(scope.row.id, 'detail')">详情</el-button>
                        <el-button type="text" :size="globalSize" @click="deleteUser(scope.row)">删除</el-button>
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
        </div>
        <user-info-dialog ref="userInfo" @closed="closeUserInfoDialog"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserInfoDialog from '@/widget/userInfo'
import { MessageBox } from 'element-ui'
import loader from '@/mixins/loader'

export default {
    name: 'CommonUser',
    components: {
        UserInfoDialog
    },
    mixins: [loader],
    data() {
        return {
            queryInfo: {
                name: '',
                date: '',
                is_vip: 2,
                page: 1,
                pageSize: 10
            },
            total: 0,
            tableData: []
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        queryData() {
            this.fetchData()
        },
        fetchData() {
            this.get('getUserList', this.queryInfo).then(res => {
                if (!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                }
            })
        },
        pageChangeEvent() {

        },
        addUser(id) {
            this.$refs.userInfo.open(null, 'add')
        },
        showUserInfo(id, type) {
            this.$refs.userInfo.open(id, type)
        },
        deleteUser(row) {
            MessageBox.confirm(`确认删除${row.name}客户`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.post('deleteUser', { id: row.id }).then(res => {
                    if (!res.code) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.fetchData()
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }).catch(() => {
            })
        },
        closeUserInfoDialog(update) {
            update && this.fetchData()
        }
    }
}
</script>
<style lang="scss">

</style>