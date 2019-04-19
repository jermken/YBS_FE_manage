<template>
    <div class="bill-page">
        <div class="page-form-wrapper no-tab">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
                <el-form-item label="消费日期">
                    <el-date-picker type="date" v-model="queryInfo.date" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="客户姓名">
                    <el-input v-model="queryInfo.name" placeholder="请输入客户姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="date" label="消费日期" width="180"></el-table-column>
                <el-table-column  prop="project" label="消费项目" width="200">
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.project" :key="item.title" size="mini">{{item.title}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  prop="total" label="消费总额" width="100"></el-table-column>
                <el-table-column  prop="card_minu" label="扣卡金额" width="100"></el-table-column>
                <el-table-column  prop="pay_amount" label="收纳金额" width="100"></el-table-column>
                <el-table-column  prop="no_pay" label="未付金额" width="100"></el-table-column>
                <el-table-column  prop="pay_type" label="付款方式" width="200">
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.pay_type" :key="item.title" size="mini">{{item.title}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="statusType[scope.row.status]['type']" :size="globalSize">{{statusType[scope.row.status]['title']}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  prop="desc" label="备注">
                    <template slot-scope="scope">
                        <el-popover :content="scope.row.desc" trigger="hover" width="150" placement="top">
                            <div class="bill-desc" slot="reference">{{scope.row.desc}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" :size="globalSize" @click="toAuditor(scope.row.id)">审核</el-button>
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
        <auditor-dialog :config="auditorDialogConf" @auditor="auditor" @closed="closedAuditorDialog"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'
import AuditorDialog from '@/widget/auditor'

export default {
    name: 'Bill',
    components: {
        AuditorDialog
    },
    mixins: [loader],
    data() {
        return {
            queryInfo: {
                name: '',
                date: '',
                page: 1,
                pageSize: 10
            },
            total: 0,
            tableData: [],
            statusType: {
                '1': {type: 'warning', title: '待审核'},
                '2': {type: 'success', title: '已通过'},
                '3': {type: 'danger', title: '不通过'}
            },
            auditorDialogConf: {
                visible: false,
                title: '消费单审核'
            }
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        isShowPagination() {
            return this.total > this.pageSize
        }
    },
    methods: {
        queryData() {
            this.queryInfo.page = 1;
            this.fetchData()
        },
        fetchData() {
            this.get('getBillList', this.queryInfo).then(res => {
                if(!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        },
        pageChangeEvent(val) {
            this.queryInfo.page = val
            this.fetchData()
        },
        toAuditor(id) {
            this.auditorDialogConf.visible = true
            this.auditorId = id
        },
        auditor(result) {
            let obj = {
                id: this.auditorId,
                status: '1'
            }
            if (result) {
                obj.status = '2'
            } else {
                obj.status = '3'
            }
            // TODO: 审核消费单
            console.log(obj)
            this.auditorDialogConf.visible = false
            this.fetchData()
        },
        closedAuditorDialog() {
            this.auditorDialogConf.visible = false
        }
    }
}
</script>
<style lang="scss">
@import '@/scss/mixin.scss';

.bill-desc {
    @include text-overflow-ellipsis;
    width: 100px;
}
</style>