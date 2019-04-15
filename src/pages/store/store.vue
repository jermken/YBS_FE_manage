<template>
    <div>
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
                <el-form-item label="产品">
                    <el-input v-model="queryInfo.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input  v-model="queryInfo.code" placeholder="请输入编码"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="queryInfo.status" @change="queryData">
                        <el-radio :label="0">库存不足</el-radio>
                        <el-radio :label="1">全部</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="id" label="编码" width="120"></el-table-column>
                <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
                <el-table-column prop="size" label="规格" width="120"></el-table-column>
                <el-table-column label="库存状态" width="120">
                    <template slot-scope="scope" v-if="scope.row.num - scope.row.minNum <= 0">
                        <el-tag type="danger">库存不足</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  prop="price" label="售价" width="120">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="minNum" label="安全库存" width="120"></el-table-column>
                <el-table-column  prop="num" label="库存量" width="120"></el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize">入库记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper" v-if="isShowPagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    :current-page="page"
                    @current-change="pageChangeEvent">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    name: 'Store',
    data() {
        return {
            queryInfo: {
                name: '',
                code: '',
                status: 1
            },
            page: 1,
            pageSize: 10,
            tableData: [],
            total: 0
        }
    },
    mixins: [loader],
    computed: {
        ...mapGetters(['globalSize']),
        isShowPagination() {
            return this.total > this.pageSize
        }
    },
    watch: {
        'globalSize': function(val) {
            this.pageSize = val === 'small' ? 10 : 8
        }
    },
    methods: {
        queryData() {
            let params = {
                ...this.queryInfo,
                page: 1,
                pageSize: this.pageSize
            }
            this.fetchData(params)
        },
        async fetchData(params) {
            let obj = params || {
                page: 1,
                pageSize: this.pageSize,
                name: '',
                code: '',
                status: 1
            }
            this.get('getGoodsStore', obj).then(res => {
                if (!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                }
            })
        },
        pageChangeEvent(val) {
            this.page = val
            let params = {
                ...this.queryInfo,
                page: val,
                pageSize: this.pageSize
            }
            this.fetchData(params)
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>