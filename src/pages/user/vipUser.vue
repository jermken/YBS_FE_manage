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
            <div class="total-info">
                总数：
                <span class="total-info__txt">{{total}}</span>
                总余额：
                <span class="total-info__txt">{{card_total_amount}}</span>
                总赠送金额：
                <span class="total-info__txt">{{present_total_amount}}</span>
            </div>
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
                <el-table-column  prop="action" label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize" @click="showVipUserInfo(scope.row.id, 'editor')">编辑</el-button>
                        <el-button type="text" :size="globalSize" @click="showVipUserInfo(scope.row.id, 'detail')">详情</el-button>
                        <el-button type="text" :size="globalSize" @click="removeVip(scope.row)">取消会员</el-button>
                        <el-button type="text" :size="globalSize" @click="deleteVipUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper" v-if="total">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="tableData.length"
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
    name: 'VipUser',
    components: {
        UserInfoDialog
    },
    mixins: [loader],
    data() {
        return {
            queryInfo: {
                name: '',
                date: '',
                is_vip: 1,
                page: 1,
                pageSize: 10
            },
            tableData: [],
            total: 0,
            card_total_amount: '1000000.00',
            present_total_amount: '1000000.00'
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
        pageChangeEvent() {

        },
        async fetchData() {
            this.get('getUserList', this.queryInfo).then(res => {
                if (!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                }
            })
        },
        addUser() {
            this.$refs.userInfo.open(null, 'add')
        },
        showVipUserInfo(id, type) {
            this.$refs.userInfo.open(id, type)
        },
        deleteVipUser(row) {
            MessageBox.confirm(`确认删除VIP客户${row.name}`, '提示', {
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
        removeVip(row) {
            MessageBox.confirm(`确认取消客户${row.name}VIP身份`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let params = { ...row, is_vip: 2 }
                this.post('updateUser', params).then(res => {
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
@import '@/scss/variable.scss';

.no-pay-txt {
    color: $themeWarnColor;
}
.total-info {
    background: #ccc;
    height: 46px;
    line-height: 48px;
    .total-info__txt {
        font-weight: bold;
        margin: 0 20px 0 10px;
    }
}
</style>