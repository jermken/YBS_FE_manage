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
                <el-table-column prop="action_date" label="操作时间" width="220"></el-table-column>
                <el-table-column prop="auditor_date" label="审核时间" width="220">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditor_date || '-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actioner" label="入库人" width="150"></el-table-column>
                <el-table-column prop="auditor" label="审核人" width="150"></el-table-column>
                <el-table-column prop="status" label="状态" width="150">
                    <template slot-scope="scope">
                        <el-tag :type="statusType[scope.row.status]['type']" :size="globalSize">{{statusType[scope.row.status]['title']}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="备注" width="200">
                    <template slot-scope="scope">
                        <span :title="scope.row.desc">{{scope.row.desc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize" @click="showBillDetail">入库单详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper" v-if="isShowPagination">
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
        </div>
        <store-detail-dialog :show.sync="detailDialogVisible" :detailId="billDetailId" title="入库" @closed="closeBillDetail"></store-detail-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import StoreDetailDialog from '@/widget/storeDetail.vue'

export default {
    name: 'JoinStore',
    components: {
        StoreDetailDialog
    },
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
            page: 1,
            pageSize: 10,
            tableData: [{
                action_date: '2018-09-01',
                auditor_date: '2018-09-11',
                actioner: '小琴',
                auditor: 'jermken',
                status: '1',
                desc: '第一次入库'
            },{
                action_date: '2018-09-02',
                auditor_date: '2018-09-12',
                actioner: '小婷',
                auditor: 'jermken',
                status: '2',
                desc: '第二次入库'
            },{
                action_date: '2018-09-03',
                auditor_date: '2018-09-13',
                actioner: '小婕',
                auditor: 'jermken',
                status: '3',
                desc: '第三次入库'
            }],
            total: 0,
            queryInfo: {
                date: '',
                status: '0'
            },
            detailDialogVisible: false,
            billDetailId: ''
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
            this.page = 1
            let params = {
                ...this.queryInfo,
                page: 1,
                pageSize: this.pageSize
            }
            this.fetchData(params)
        },
        async fetchData(params) {
            let obj = params || {
                date: '',
                status: '0',
                page: 1,
                pageSize: this.pageSize
            }
            console.log(obj)
            // TODO: 拉取入库单列表
        },
        pageChangeEvent(val) {
            this.page = val
            let params = {
                ...this.queryInfo,
                page: val,
                pageSize: this.pageSize
            }
            this.fetchData(params)
        },
        addStoreBill() {
            this.detailDialogVisible = true
        },
        showBillDetail() {
            this.detailDialogVisible = true
        },
        closeBillDetail(update) {
            this.detailDialogVisible = false
            update && this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>