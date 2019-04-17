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
                <el-table-column prop="start_time" label="开始时间" width="220">
                    <template></template>
                </el-table-column>
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
        <setmeal-dialog ref="setmealDialog" @closed="closedSetmealDialog"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'element-ui'
import loader from '@/mixins/loader'
import { SETMEAL_LIST } from '@/mock/mock.data'
import setmealDialog from '@/widget/setMealInfo'

export default {
    name: 'SetMeal',
    components: {
        setmealDialog
    },
    mixins: [loader],
    data() {
        return {
            queryInfo: {
                name: '',
                start_time: '',
                end_time: '',
                page: 1,
                pageSize: 8
            },
            total: 0,
            tableData: []
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchData() {
            this.get('getSetMeal', this.queryInfo).then(res => {
                if (!res.code) {
                    this.tableData = res.data
                    this.total = res.total
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        queryData() {
            this.queryInfo.page = 1
            this.fetchData()
        },
        addSetMeal() {
            this.$refs.setmealDialog.open()
        },
        editorSetMeal(id) {
            this.$refs.setmealDialog.open(id)
        },
        deleteSetMeal(id) {
            MessageBox.confirm('确认删除该套餐', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.post('deleteSetMeal', { id }).then(res => {
                    if (!res.code) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.queryData()
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        pageChangeEvent(val) {
            this.queryInfo.page = val
            this.fetchData()
        },
        closedSetmealDialog(update) {
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