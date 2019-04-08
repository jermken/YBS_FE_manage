<template>
    <el-dialog :visible.sync="dialogShow" :close-on-click-modal="false" :title="title+'单详情'" width="1000px" :before-close="beforeClose" @close="resetFields">
        <div style="min-height: 400px;">
            <el-table border style="width: 100%;" :size="globalSize" :data="tableData" height="450">
                <el-table-column prop="name" label="产品名称">
                    <template slot-scope="scope">
                        <el-select :size="globalSize" v-model="tableData[scope.$index].id" filterable :disabled="!!detailId" @change="(val) => selectItemGoods(val, scope.$index)">
                            <el-option
                                v-for="item in goodsList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                :disabled="item.disabled"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="编码"></el-table-column>
                <el-table-column prop="size" label="规格"></el-table-column>
                <el-table-column prop="num" label="当前库存"></el-table-column>
                <el-table-column prop="action_num" :label="title+'数量'">
                    <template slot-scope="scope">
                        <el-input :size="globalSize" :disabled="!!detailId || !tableData[scope.$index].id" v-model="tableData[scope.$index].action_num"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            :disabled="!!detailId"
                            icon="el-icon-circle-plus"
                            circle
                            :size="globalSize"
                            @click="addItem(scope.$index)"
                            >
                        </el-button>
                        <el-button
                            :disabled="!!detailId"
                            v-if="tableData.length !== 1 || scope.$index"
                            icon="el-icon-remove"
                            circle
                            :size="globalSize"
                            @click="deleteItem(scope.$index)"
                            >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer">
            <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
            <el-button @click="confirmEvent('goodsInfoForm')" :size="globalSize" type="primary">提交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    // 入库或出库单详情组件
    name: 'StoreDetailDialog',
    mixins: [loader],
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
            tableData: [{
                name: '',
                code: '',
                size: '',
                num: '',
                action_num: ''
            }],
            goodsList: [],
            queryGoodsParams: {
                name: '',
                code: '',
                status: 1
            }
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
    mounted() {
        this.fetchGoodsList(this.queryGoodsParams)
    },
    methods: {
        async fetchGoodsList(params) {
            this.get('getGoodsList', {
                ...params
            }).then((res) => {
                if (!res.code) {
                    this.goodsList = res.data
                }
            })
        },
        async fetchDetailInfo(id) {
            console.log(id)
            // TODO: 拉取出/入库单详情
        },
        beforeClose() {
            this.$emit('closed')
        },
        cancelEvent() {
            this.$emit('closed')
        },
        resetFields() {
            this.tableData = [{
                name: '',
                code: '',
                size: '',
                num: '',
                action_num: '',
                id: ''
            }]
            this.goodsList = this.goodsList.map((item) => {
                item.disabled = false
                return item
            })
        },
        selectItemGoods(val,idx) {
            let obj = this.goodsList.find((obj) => {
                return obj.id === val
            })
            obj.action_num = 0
            this.tableData[idx] = obj
            this.setGoodsList()
        },
        setGoodsList() {
            this.goodsList = this.goodsList.map((item) => {
                item.disabled = this.tableData.some((i) => { 
                    return i.id === item.id
                }) ? true : false
                return item
            })
        },
        deleteItem(idx) {
            this.tableData.splice(idx, 1)
            this.setGoodsList()

        },
        addItem(idx) {
            this.tableData.splice(idx+1, 0, {
                id: '',
                name: '',
                code: '',
                size: '',
                num: '',
                action_num: ''
            })
        },
        confirmEvent() {
            let list = this.tableData.map(item => {
                return {
                    id: item.id,
                    num: item.action_num
                }
            })
            let params = {
                list: JSON.stringify(list),
                remark: '',
                actioner: 'jermken'
            }
            this.post('createStore', params).then(res => {
                if (!res.code) {

                }
            })
        }
    }
}
</script>