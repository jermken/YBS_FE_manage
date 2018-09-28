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
                    <el-button @click="addVipUser" icon="el-icon-edit" type="primary">新增客户</el-button>
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
                <el-table-column prop="name" label="姓名" width="100" fixed></el-table-column>
                <el-table-column prop="date" label="注册日期" width="140" fixed></el-table-column>
                <el-table-column  prop="sexual" label="性别" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.sexual === '1' ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="tell" label="手机号" width="100"></el-table-column>
                <el-table-column  prop="even_amount" label="客单价" width="80"></el-table-column>
                <el-table-column  prop="consume_total" label="消费总额" width="100"></el-table-column>
                <el-table-column  prop="consume_times" label="消费次数" width="80"></el-table-column>
                <el-table-column  prop="last_consume" label="上次消费" width="140"></el-table-column>
                <el-table-column  prop="no_pay" label="未付款额" width="80">
                    <template slot-scope="scope">
                        <span :class="{'no-pay-txt': Number(scope.row.no_pay) > 0}">{{scope.row.no_pay}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="card_amount" label="卡内余额" width="100"></el-table-column>
                <el-table-column  prop="present_amount" label="赠送金额" width="100"></el-table-column>
                <el-table-column  prop="points" label="积分" width="80"></el-table-column>
                <el-table-column  prop="desc" label="备注" width="100" fixed="right">
                    <template slot-scope="scope">
                        <el-popover :content="scope.row.desc" trigger="hover" width="150" placement="top">
                            <div class="bill-desc" slot="reference">{{scope.row.desc}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column  prop="action" label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" :size="globalSize" @click="editorVipUserInfo(scope.row.id)">编辑</el-button>
                        <el-button type="text" :size="globalSize" @click="showVipUserInfo(scope.row.id)">详情</el-button>
                        <el-button type="text" :size="globalSize" @click="removeVip(scope.row)">取消会员</el-button>
                        <el-button type="text" :size="globalSize" @click="deleteVipUser(scope.row)">删除</el-button>
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
        <user-info-dialog :config="detailDialogConf" @closed="closeUserInfoDialog"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserInfoDialog from '@/widget/userInfo'
import { MessageBox } from 'element-ui'

export default {
    name: 'VipUser',
    components: {
        UserInfoDialog
    },
    data() {
        return {
            queryInfo: {
                name: '',
                date: ''
            },
            page: 1,
            pageSize: 10,
            tableData: [{
                id: 1,
                name: '小红',
                date: '2018-07-03 23:23:23',
                sexual: '1',
                even_amount: '600.00',
                tell: '13212343212',
                consume_total: '3000.00',
                consume_times: '5',
                card_amount: '200.00',
                present_amount: '100.00',
                last_consume: '2018-09-23 18:23:21',
                no_pay: '20',
                points: '0',
                desc: '这是备注'
            }],
            total: 10000,
            card_total_amount: '1000000.00',
            present_total_amount: '1000000.00',
            detailDialogConf: {
                visible: false,
                canEditor: true,
                userId: null,
                isVip: true
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

        },
        pageChangeEvent() {

        },
        addVipUser() {
            this.detailDialogConf = { ...this.detailDialogConf, userId: null, canEditor: true, visible: true }
        },
        showVipUserInfo(id) {
            this.detailDialogConf = { ...this.detailDialogConf, userId: id, canEditor: false, visible: true }
        },
        editorVipUserInfo(id) {
            this.detailDialogConf = { ...this.detailDialogConf, userId: id, canEditor: true, visible: true }
        },
        deleteVipUser(row) {
            // TODO: 删除客户
            MessageBox.confirm(`确认删除VIP客户${row.name}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                console.log(row.id, '删除客户id')
                MessageBox({
                    type: 'success',
                    message: '删除成功'
                })
            }).catch(() => {
            })
        },
        removeVip(row) {
            // TODO: 取消会员
            MessageBox.confirm(`确认取消客户${row.name}VIP身份`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                console.log(row.id, '取消客户id')
                MessageBox({
                    type: 'success',
                    message: '删除成功'
                })
            }).catch(() => {
            })
        },
        closeUserInfoDialog(update) {
            this.detailDialogConf.visible = false
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