<template>
    <div class="setMeal-page">
        <div class="page-form-wrapper">
            <el-form :inline="true" label-suffix="：" :size="globalSize" :mode="queryInfo">
                <el-form-item label="套餐名称">
                    <el-input v-model="queryInfo.name" placeholder="请输入套餐名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addSetMeal" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="name" label="套卡名称" width="220"></el-table-column>
                <el-table-column prop="start_time" label="开始时间" width="220"></el-table-column>
                <el-table-column prop="end_time" label="结束时间" width="220"></el-table-column>
                <el-table-column prop="total" label="套卡价格" width="220"></el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize" @click="deleteSetMeal(scope.row)">删除</el-button>
                        <el-button type="text" @click="editorSetMeal(scope.row.id)" :size="globalSize">编辑</el-button>
                        <el-button type="text" @click="editorSetMeal(scope.row.id)" :size="globalSize">用户列表</el-button>
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
        </div>
        <setmeal-dialog :show.sync="setmealDialogVisible" :setmeal_id="setmealId" @closed="closedSetmealDialog"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { SETMEAL_LIST } from '@/mock/mock.data'
import setmealDialog from '@/widget/setMealInfo'

export default {
    name: 'SetMeal',
    components: {
        setmealDialog
    },
    data() {
        return {
            queryInfo: {
                name: '',
                start_time: '',
                end_time: ''
            },
            page: 1,
            pageSize: 8,
            total: 0,
            tableData: [],
            setmealDialogVisible: false,
            setmealId: null
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        isShowPagination() {
            return this.total > this.pageSize
        }
    },
    methods: {
        async fetchData(obj) {
            let params = obj || {
                name: '',
                page: 1,
                pageSize: 8,
                start_time: '',
                end_time: ''
            }
            // TODO: 拉取套餐列表
            console.log(params)
            this.tableData = SETMEAL_LIST
            this.total = SETMEAL_LIST.length
        },
        queryData() {
            this.page = 1
            let obj = { ...this.queryInfo, page: this.page, pageSize: this.pageSize }
            this.fetchData(obj)
        },
        addSetMeal() {
            this.setmealDialogVisible = true
        },
        editorSetMeal(id) {
            this.setmealDialogVisible = true
            this.setmealId = id
        },
        deleteSetMeal() {

        },
        pageChangeEvent(val) {
            this.page = val
            let obj = { ...this.queryInfo, page: this.page, pageSize: this.pageSize }
            this.fetchData(obj)
        },
        closedSetmealDialog(update) {
            this.setmealDialogVisible = false
            this.setmealId = null
            update && this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>
<style lang="scss">

</style>