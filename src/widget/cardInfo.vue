<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="卡类信息" width="500px" :before-close="beforeClose" @close="resetFields('cardInfoForm')">
    <el-form :model="cardInfo" status-icon :rules="formRules" ref="cardInfoForm" :size="globalSize">
        <el-form-item required label="卡类名称" label-width="80px" prop="name">
            <el-input placeholder="请输入卡类名称" width="60%" v-model="cardInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="卡类价格" label-width="80px" prop="price">
            <el-input placeholder="请输入价格" width="60%" v-model="cardInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="desc">
            <el-input type="textarea" v-model="cardInfo.desc" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('cardInfoForm')" :size="globalSize" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    // 卡片详情组件
    name: 'CardInfo',
    props: {
        cardId: null,
        show: false
    },
    data() {
        return {
            cardInfo: {
                name: '',
                price: '',
                size: '',
                minNum: '',
                status: '',
                desc: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '姓名不能为空',
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
    watch: {
        'cardId': function(val) {
            val && this.fetchCardInfo(val)
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        async fetchCardInfo(id) {
            console.log(id)
            // TODO: 拉取卡类信息
        },
        cancelEvent() {
            this.$emit('closed')
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    // TODO: 新增或修改卡类信息
                    alert('success')
                    this.$emit('closed', true)
                } else {
                    return false
                }
            })
        },
        beforeClose() {
            this.$emit('closed')
        },
        resetFields(ref) {
            this.$refs[ref].resetFields()
        }
    }
}
</script>