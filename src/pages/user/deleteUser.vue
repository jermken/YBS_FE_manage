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
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="date" label="注册日期" width="150"></el-table-column>
                <el-table-column  prop="sexual" label="性别" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.sexual === '1' ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="tell" label="手机号" width="100"></el-table-column>
                <el-table-column  prop="even_amount" label="客单价" width="80"></el-table-column>
                <el-table-column  prop="consume_total" label="消费总额" width="100"></el-table-column>
                <el-table-column  prop="consume_times" label="消费次数" width="100"></el-table-column>
                <el-table-column  prop="last_consume" label="上次消费" width="150"></el-table-column>
                <el-table-column  prop="no_pay" label="未付款额" width="100"></el-table-column>
                <el-table-column  prop="points" label="积分" width="100"></el-table-column>
                <el-table-column  prop="desc" label="备注">
                    <template slot-scope="scope">
                        <el-popover :content="scope.row.desc" trigger="hover" width="150" placement="top">
                            <div class="bill-desc" slot="reference">{{scope.row.desc}}</div>
                        </el-popover>
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
    name: 'DeleteUser',
    data() {
        return {
            queryInfo: {
                name: '',
                date: ''
            },
            page: 1,
            pageSize: 10,
            tableData: [{
                name: '小红',
                date: '2018-07-03 23:23:23',
                sexual: '1',
                even_amount: '600.00',
                tell: '13212343212',
                consume_total: '3000.00',
                consume_times: '5',
                last_consume: '2018-09-23 18:23:21',
                no_pay: '0',
                points: '0',
                desc: '这是备注'
            }]
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

        },
        pageChangeEvent() {

        }
    }
}
</script>
<style lang="scss">

</style>