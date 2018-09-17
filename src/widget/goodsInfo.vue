<template>
<el-dialog :visible.sync="dialogShow" title="产品信息" width="500px" :before-close="beforeClose" @close="resetFields('goodsInfoForm')">
    <el-form :model="goodsInfo" status-icon :rules="formRules" ref="goodsInfoForm">
        <el-form-item required label="产品名称" label-width="80px" prop="name">
            <el-input placeholder="请输入产品" width="60%" v-model="goodsInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="产品价格" label-width="80px" prop="price">
            <el-input placeholder="请输入价格" width="60%" v-model="goodsInfo.price"></el-input>
        </el-form-item>
        <el-form-item required label="产品规格" label-width="80px" prop="size">
            <el-input placeholder="请输入规格" width="60%" v-model="goodsInfo.size"></el-input>
        </el-form-item>
        <el-form-item required label="库存警线" label-width="80px" prop="minNum">
            <el-input placeholder="请输入数字" width="60%" v-model="goodsInfo.minNum"></el-input>
        </el-form-item>
        <el-form-item required label="状态" label-width="80px" prop="status">
            <el-radio-group v-model="goodsInfo.status">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
                <el-radio :label="2">全部</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="desc">
            <el-input type="textarea" v-model="goodsInfo.desc" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" size="mini">取消</el-button>
        <el-button @click="confirmEvent('goodsInfoForm')" size="mini" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
export default {
    name: 'GoodsInfo',
    props: {
        goodsId: null,
        show: false
    },
    data() {
        return {
            goodsInfo: {
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
                }],
                size: [{
                    required: true,
                    message: '请输入规格',
                    trigger: 'blur'
                }],
                minNum: [{
                    required: true,
                    message: '请输入库存警线',
                    trigger: 'blur'
                }],
                status: [{
                    required: true,
                    message: '请选择在售状态',
                    trigger: 'change'
                }]
            }
        }
    },
    watch: {
        'goodsId': function(val) {
            val && this.fetchGoodsInfo(val)
        }
    },
    computed: {
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        async fetchGoodsInfo(id) {
            console.log(id)
            // TODO: 拉取产品信息
        },
        cancelEvent() {
            this.$emit('closed')
        },
        confirmEvent(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    // TODO: 新增或修改产品信息
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