<template>
    <el-dialog :visible.sync="show" :close-on-click-modal="false" :title="title+'单详情'" width="1000px" :before-close="beforeClose" @close="resetFields">
        <div style="min-height: 400px;">
            <el-form>
                <el-form-item label="审核人" required>
                    <el-select v-model="actioner" :size="globalSize" filterable placeholder="请选择审核人">
                        <el-option v-for="item in sysUserList" :key="item.name" :disabled="item.role === 'staff'" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table border style="width: 100%;" :size="globalSize" :data="tableData" height="450">
                <el-table-column prop="name" label="产品名称">
                    <template slot-scope="scope">
                        <el-select :size="globalSize" v-model="tableData[scope.$index].id" filterable @change="(val) => selectItemGoods(val, scope.$index)">
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
                        <el-input :size="globalSize" :disabled="!tableData[scope.$index].id" v-model="tableData[scope.$index].action_num"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-circle-plus"
                            circle
                            :size="globalSize"
                            @click="addItem(scope.$index)"
                            >
                        </el-button>
                        <el-button
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
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
            <el-button @click="confirmEvent('goodsInfoForm')" v-if="status == 1" :size="globalSize" type="primary" :loading="loading">提交</el-button>
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
            },
            status: 1,
            actioner: '',
            sysUserList: [],
            loading: false,
            detailId: '',
            show: false
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    mounted() {
        this.getSysUserList()
    },
    methods: {
        fetchGoodsList(params) {
            return this.get('getGoodsList', {
                ...params
            }).then((res) => {
                if (!res.code) {
                    this.goodsList = res.data
                    return res
                }
            })
        },
        async fetchDetailInfo(id) {
            this.get('storeDetail',{ id }).then(res => {
                if (!res.code) {
                    let data = []
                    let list = JSON.parse(res.data.list) || []
                    this.status = res.data.status
                    list.forEach(item => {
                        this.goodsList.forEach(item2 => {
                            if (item.id == item2.id) {
                                let its = JSON.parse(JSON.stringify(item2))
                                its.action_num = item.num
                                data.push(its)
                            }
                        })
                    })
                    this.tableData = data
                    this.actioner = res.data.actioner
                }
            })
        },
        async open(id) {
            if (id) {
                this.detailId  = id
                let res = await this.fetchGoodsList(this.queryGoodsParams)
                if (!res.code) {
                    this.fetchDetailInfo(id)
                }
            }
            this.show = true
        },
        getSysUserList() {
            this.get('getStaffList').then(res => {
                if (!res.code) {
                    this.sysUserList = res.data
                }
            })
        },
        beforeClose() {
            this.show = false
            this.tableData = []
            this.actioner = ''
        },
        cancelEvent() {
            this.show = false
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
            this.loading = true
            let list = this.tableData.map(item => {
                return {
                    id: item.id,
                    num: item.action_num
                }
            })
            let params = {
                list: JSON.stringify(list),
                remark: '',
                actioner: this.actioner,
                status: 1
            }
            let api = this.detailId ? 'updateStore' : 'createStore'
            if (this.detailId) {
                params.id = this.detailId
            }
            this.post(api, params).then(res => {
                if (!res.code) {
                    this.$message({
                        type: 'success',
                        message: `入库单${this.detailId? '修改' : '创建'}成功`
                    })
                    this.show = false
                    this.$emit('closed', true)
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        }
    }
}
</script>