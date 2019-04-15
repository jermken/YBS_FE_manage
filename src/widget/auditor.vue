<template>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" :title="title" width="500px" :before-close="beforeClose">
        <el-form>
            <el-form-item label="审核人" required>
                <el-select v-model="auditor_name" :size="globalSize" filterable placeholder="请选择审核人">
                    <el-option v-for="item in auditorList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
            <el-button @click="disAgree" :size="globalSize" type="primary" :loading="loading">不通过</el-button>
            <el-button @click="agree" :size="globalSize" type="primary" :loading="loading">通过</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    // 审核组件
    name: 'AuditorDialog',
    props: {
        title: '',
        type: ''
    },
    data() {
        return {
            show: false,
            id: 0,
            params: '',
            loading: false,
            auditor_name: '',
            auditorList: []
        }
    },
    mixins: [loader],
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        open(id, params) {
            this.show = true
            this.id = id
            this.params = params
            this.getSysUserList()
        },
        getSysUserList() {
            this.get('getStaffList').then(res => {
                if (!res.code) {
                    let arr = []
                    res.data.map((item => {
                        if (item.role === 'manager' || item.role === 'boss') {
                            arr.push(item)
                        }
                    }))
                    this.auditorList = arr
                }
            })
        },
        close() {
            this.show = false
        },
        cancelEvent() {
            this.close()
        },
        agree() {
            this.auditor(true)
        },
        disAgree() {
            this.auditor(false)
        },
        auditor(val) {
            let type = this.type
            if (!type) return
            this.loading = true
            switch(type) {
                case 'joinstore':
                    this.joinStore(val)
                    break
                case 'bill':
                    this.changeBill(val)
                    break
                default:
                    console.log('do nothing')
            }
        },
        joinStore(val) {
            this.post('updateStore', {id: this.id, status: val? 2 : 3, auditor_name: this.auditor_name, list: this.params}).then(res => {
                if (!res.code) {
                    this.$message({
                        type: 'success',
                        message: '审批成功'
                    })
                    this.close()
                    this.$emit('afterClose')
                } else {
                    this.$message({
                        type: 'error',
                        message: '审批失败'
                    })
                    this.loading = false
                }
            })
        },
        changeBill() {
            // TODO: 审批帐单
        },
        beforeClose() {
            this.loading = false
            this.show = false
        }
    }
}
</script>