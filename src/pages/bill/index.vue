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
    name: 'Bill',
    data() {
        return {
            queryInfo: {
                name: '',
                date: '2018-09-09'
            },
            tableData: [{
                name: '李四李四',
                date: '2018-09-08 12:34:50',
                project: [{title: '洗脸'},{title: '美甲'},{title: '小气泡'},{title: '碧波庭'}],
                total: '2000.00', 
                card_minu: '500.00',
                pay_amount: '1500.00',
                no_pay: '0',
                pay_type: [{title: '现金'}],
                desc: '扣卡金额50元扣卡金额50元扣卡金额50元'
            }],
            page: 1,
            pageSize: 10
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
@import '@/scss/mixin.scss';

.bill-desc {
    @include text-overflow-ellipsis;
    width: 100px;
}
</style>