<template>
<el-dialog :close-on-click-modal="false" :visible.sync="show" title="卡类信息" width="500px" :before-close="beforeClose" @close="resetFields('cardInfoForm')">
    <el-form :model="cardInfo" status-icon :rules="formRules" ref="cardInfoForm" :size="globalSize">
        <el-form-item required label="卡类名称" label-width="80px" prop="name">
            <el-input placeholder="请输入卡类名称" width="60%" v-model="cardInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="卡类价格" label-width="80px" prop="price">
            <el-input placeholder="请输入价格" width="60%" v-model="cardInfo.price"></el-input>
        </el-form-item>
        <el-form-item required label="赠送金额" label-width="80px" prop="price">
            <el-input placeholder="请输入价格" width="60%" v-model="cardInfo.present_price"></el-input>
        </el-form-item>
        <el-form-item required label="激活" label-width="80px" prop="present_price">
            <el-switch v-model="cardInfo.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="remark">
            <el-input type="textarea" v-model="cardInfo.remark" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('cardInfoForm')" :size="globalSize" :loading="loading" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    // 卡片详情组件
    name: 'CardInfo',
    mixins: [loader],
    data() {
        return {
            show: false,
            loading: false,
            cardInfo: {
                name: '',
                price: 0,
                present_price: 0,
                status: false,
                remark: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '卡类名称不能为空',
                    trigger: 'blur'
                }],
                price: [{
                    required: true,
                    message: '请填写价格',
                    trigger: 'blur'
                }]
            }
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchCardInfo(id) {
            this.get('getCardDetail', { id }).then(res => {
                if (!res.code) {
                    this.cardInfo = res.data
                    this.cardInfo.status = this.cardInfo.status === 0 ? false : true
                }
            })
        },
        open(id) {
            if (id) {
                this.fetchCardInfo(id)
            }
            this.show = true
        },
        close() {
            this.show = false
        },
        cancelEvent() {
            this.close()
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.loading = true
                    let api = this.cardInfo.id ? 'updateCard' : 'addCard'
                    this.cardInfo.status = this.cardInfo.status ? 1 : 0
                    this.post(api, {list: '[]', ...this.cardInfo}).then(res =>{
                        if (!res.code) {
                            this.$message({
                                type: 'success',
                                message: this.cardInfo.id ? '编辑卡类成功' : '新增卡类成功'
                            });
                            this.$emit('closed', true)
                            this.close()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        this.loading = false
                    }).catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err
                        });
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        },
        beforeClose() {
            this.close()
        },
        resetFields(ref) {
            this.$refs[ref].resetFields()
        }
    }
}
</script>