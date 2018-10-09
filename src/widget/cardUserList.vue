<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="持卡客户" width="600px" :before-close="beforeClose" @close="resetFields('cardUserForm')">
    <el-form :model="cardUserInfo" label-suffix="：" status-icon ref="cardUserForm" :inline="true" :size="globalSize">
        <el-form-item label="客户姓名" prop="name">
            <el-input placeholder="请输入姓名" width="60%" v-model="cardUserInfo.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
        </el-form-item>
    </el-form>
    <el-table border :size="globalSize" :data="tableData" style="width: 100%;">
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="date" label="开卡日期" width="200"></el-table-column>
        <el-table-column prop="server_name" label="开卡美容师" width="120"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
    </el-table>
    <span slot="footer">
        <el-button @click="closeEvent">关闭</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    // 卡片持有客户列表组件
    name: 'CardUserList',
    props: {
        cardId: null,
        show: false
    },
    data() {
        return {
            cardUserInfo: {
                name: ''
            },
            tableData: [{
                id: 1,
                name: '王小姐',
                date: '2018-09-09 12:23:45',
                server_name: '小李',
                desc: '这是备注'
            }]
        }
    },
    watch: {
        'cardId': function(val) {
            val && this.fetchCardUser({id: val})
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        async fetchCardUser(obj) {
            console.log(obj)
            // TODO: 拉取卡类客户持有者列表
        },
        closeEvent() {
            this.$emit('closed')
        },
        beforeClose() {
            this.$emit('closed')
        },
        resetFields(ref) {
            this.$refs[ref].resetFields()
        },
        queryData() {
            this.fetchCardUser({id: this.cardId, name: this.cardUserInfo.name})
        }
    }
}
</script>