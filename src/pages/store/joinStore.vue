<template>
    <div>
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
                <el-form-item label="入库时间">
                    <el-date-picker type="date" v-model="queryInfo.date" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="queryInfo.status" @change="queryData">
                        <el-radio v-for="item in statusArr" :key="item.label" :label="item.label">{{item.title}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addStoreBill" icon="el-icon-edit" type="primary">新增入库单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="create_time" label="创建时间" width="220"></el-table-column>
                <el-table-column prop="actioner" label="操作人" width="150"></el-table-column>
                <el-table-column prop="update_time" label="修改时间" width="220"></el-table-column>
                <el-table-column prop="auditor_name" label="审核人" width="150"></el-table-column>
                <el-table-column prop="auditor_time" label="审核时间" width="220">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditor_time || '-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="备注" width="200">
                    <template slot-scope="scope">
                        <span :title="scope.row.desc">{{scope.row.desc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="150">
                    <template slot-scope="scope">
                        <el-tag :type="statusType[scope.row.status]['type']" :size="globalSize">{{statusType[scope.row.status]['title']}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize" @click="showBillDetail(scope.row.id)">入库单详情</el-button>
                        <el-button v-if="scope.row.status == 1" type="text" :size="globalSize" @click="showAuditorDialog(scope.row)">审批</el-button>
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
        <auditor-dialog ref="auditor" title="入库单审批" type="joinstore" @afterClose="queryData"></auditor-dialog>
        <store-detail-dialog ref="storeDetail" title="入库" @closed="closeBillDetail"></store-detail-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import StoreDetailDialog from '@/widget/storeDetail.vue'
import auditorDialog from '@/widget/auditor.vue'
import loader from '@/mixins/loader'

export default {
    name: 'JoinStore',
    components: {
        StoreDetailDialog,
        auditorDialog
    },
    mixins: [loader],
    data() {
        return {
            statusArr: [{
                label: '0',
                title: '全部'
            },{
                label: '1',
                title: '待审核'
            },{
                label: '2',
                title: '已通过'
            },{
                label: '3',
                title: '不通过'
            }],
            statusType: {
                '1': {type: 'warning', title: '待审核'},
                '2': {type: 'success', title: '已通过'},
                '3': {type: 'danger', title: '不通过'}
            },
            tableData: [],
            total: 0,
            queryInfo: {
                date: '',
                status: '0',
                page: 1,
                pageSize: 10
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
        async fetchData() {
            this.get('getStore', this.queryInfo).then(res => {
                if (!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                }
            })
        },
        pageChangeEvent(val) {
            this.queryInfo.page = val
            this.fetchData()
        },
        addStoreBill() {
            this.$refs.storeDetail.open()
        },
        showBillDetail(id) {
            this.$refs.storeDetail.open(id)
        },
        showAuditorDialog(row) {
            this.$refs.auditor.open(row.id, row.list)
        },
        closeBillDetail(update) {
            update && this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>