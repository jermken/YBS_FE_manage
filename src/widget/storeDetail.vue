<template>
    <el-dialog :visible.sync="dialogShow" :title="title+'单详情'" width="1000px" :before-close="beforeClose" @close="resetFields('storeDetailForm')">
        <el-form ref="storeDetailForm" :size="globalSize">
            <el-table border style="width: 100%;" :size="globalSize" :data="tableData">
                <el-table-column prop="name" label="产品名称">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.name" filterable :disabled="!!detailId">
                            <el-option
                                v-for="item in goodsList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="编码"></el-table-column>
                <el-table-column prop="size" label="规格"></el-table-column>
                <el-table-column prop="num" label="当前库存"></el-table-column>
                <el-table-column prop="action_num" :label="title+'数量'">
                    <template slot-scope="scope">
                        <el-input :disabled="!!detailId"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            :disabled="!!detailId"
                            v-if="tableData.length !== 1 || scope.$index"
                            icon="el-icon-remove"
                            circle
                            :size="globalSize"
                            @click="deleteItem(scope.$index)"
                            >
                        </el-button>
                        <el-button 
                            :disabled="!!detailId"
                            icon="el-icon-circle-plus"
                            circle
                            :size="globalSize"
                            @click="addItem(scope.$index)"
                            >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'StoreDetailDialog',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        detailId: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            tempItem: {
                name: '',
                code: '',
                size: '',
                num: '',
                action_num: ''
            },
            tableData: [{
                name: '',
                code: '',
                size: '',
                num: '',
                action_num: ''
            }],
            goodsList: []
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.show
        }
    },
    watch: {
        'detailId': function(id) {
            id && this.fetchDetailInfo(id)
        }
    },
    methods: {
        async fetchDetailInfo(id) {
            console.log(id)
            // TODO: 拉取出/入库单详情
        },
        beforeClose() {
            this.$emit('closed')
        },
        resetFields(ref) {
            this.$refs[ref].resetFields()
        },
        deleteItem(idx) {
            this.tableData.splice(idx, 1)
        },
        addItem(idx) {
            this.tableData.splice(idx, 0, this.tempItem)
        }
    }
}
</script>