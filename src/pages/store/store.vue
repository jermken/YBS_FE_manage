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
                    <el-radio-group v-model="queryInfo.numStatus">
                        <el-radio label="1">库存不足</el-radio>
                        <el-radio label="2">全部</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="code" label="编码" width="120"></el-table-column>
                <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
                <el-table-column  prop="size" label="规格" width="120"></el-table-column>
                <el-table-column  prop="type" label="品类" width="120"></el-table-column>
                <el-table-column  prop="price" label="售价" width="120">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="safeNum" label="安全库存" width="120"></el-table-column>
                <el-table-column  prop="num" label="库存量" width="120"></el-table-column>
                <el-table-column  prop="desc" label="备注" width="120"></el-table-column>
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
                    :total="tableData.length"
                    :page-size="pageSize"
                    :pager-count="7"
                    :current-page="page"
                    @current-change="pageChangeEvent">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Store',
    data() {
        return {
            queryInfo: {
                name: '',
                code: '',
                numStatus: '2'
            },
            page: 1,
            pageSize: 10,
            tableData: [{
                code: 'e423231',
                name: '补水面膜',
                size: '5片/盒',
                typs: '面膜',
                price: '188.00',
                safeNum: 5,
                num: 13,
                desc: '这是最新款面膜'
            }],
            total: 0
        }
    },
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
                numStatus: '2'
            }
            console.log(obj)
            // TODO: 拉取库存列表
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