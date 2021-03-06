<template>
<el-dialog :close-on-click-modal="false" :visible.sync="show" title="产品信息" width="500px" :before-close="beforeClose" @close="resetFields('goodsInfoForm')">
    <el-form :model="goodsInfo" status-icon :rules="formRules" ref="goodsInfoForm" :size="globalSize">
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
        <el-form-item label="上传图片" v-if="goodsInfo.imgUrl">
            <img style="width: 100px;height: 100px;" :src="goodsInfo.imgUrl"/>
        </el-form-item>
        <el-form-item label="上传图片" v-else>
            <img style="width: 100px;height: 100px;" v-if="imageUrl" :src="imageUrl"/>
            <el-upload
            v-else
            action=""
            :on-change="handleImgChange"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :auto-upload="false"
            list-type="picture-card"
            >
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="remark">
            <el-input type="textarea" v-model="goodsInfo.remark" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('goodsInfoForm')" :size="globalSize" type="primary" :loading="loading">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/utils/index'
import loader from '@/mixins/loader'
import * as qiniu from 'qiniu-js'

export default {
    // 商品详情组件
    name: 'GoodsInfo',
    mixins: [loader],
    data() {
        let validPrice = (rule, value, cb) => {
            if (utils.isValidatePrice(value)) {
                cb()
            } else {
                cb(new Error('价格格式有误，最多两位小数'))
            }
        }
        let validMinNum = (rule, value, cb) => {
            if (utils.isInt(value)) {
                cb()
            } else {
                cb(new Error('请输入正整数'))
            }
        }
        return {
            show: false,
            loading: false,
            imageUrl: '',
            file: null,
            imgVisible: false,
            goodsInfo: {
                name: '',
                price: '',
                size: '',
                minNum: '',
                status: '',
                remark: '',
                imgUrl: '',
                num: 0
            },
            formRules:{
                name: [{
                    required: true,
                    message: '产品名称必填',
                    trigger: 'blur'
                }],
                price: [{
                    validator: validPrice,
                    trigger: 'blur'
                }],
                size: [{
                    required: true,
                    message: '请输入规格',
                    trigger: 'blur'
                }],
                minNum: [{
                    validator: validMinNum,
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
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchGoodsInfo(id) {
            this.get('getGoodsDetail', {
                id
            }).then((res) => {
                if (!res.code) {
                    this.goodsInfo = res.data
                } else {
                    this.$msgbox({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        handleImgChange(file) {
            this.imageUrl = file.url
            this.file = file
        },
        fetchUploadToken() {
            return new Promise((resolve, reject) => {
                this.get('getUploadToken', {}).then(res => {
                    if (!res.code) {
                        resolve(res.data.uploadToken)
                    } else {
                        reject('获取token出错了')
                    }
                })
            })
        },
        beforeAvatarUpload(file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        uploader(file, key, putExtra, config) {
            return new Promise((resolve, reject) => {
                this.fetchUploadToken().then(token => {
                    let u = qiniu.upload(file, key, token, putExtra, config)
                    resolve(u)
                }).catch(err => {
                    this.$msgbox({
                        message: err,
                        type: 'error'
                    })
                })
            })
        },
        open(id) {
            if (id) {
                this.fetchGoodsInfo(id)
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
                    let that = this
                    this.loading = true
                    this.uploader(this.file.raw, this.file.name, {}, {}).then(obser => {
                        obser.subscribe({
                            error(err) {
                                new Error(err)
                            },
                            complete(res) {
                                let imgUrl = `//manage.jermken.com/${res.key}`
                                if (that.goodsId) {
                                    that.post('updateGoods', {
                                        ...that.goodsInfo,
                                        imgUrl: imgUrl
                                    }).then(res => {
                                        if (!res.code) {
                                            that.$message({
                                                type: 'success',
                                                message: res.msg
                                            })
                                            that.$emit('closed', true)
                                            that.close()
                                        } else {
                                            that.$msgbox({
                                                type: 'error',
                                                message: res.msg
                                            })
                                        }
                                        that.loading = false
                                    })
                                } else {
                                    that.post('addGoods', {
                                        ...that.goodsInfo,
                                        imgUrl: imgUrl
                                    }).then(res => {
                                        if (!res.code) {
                                            that.$message({
                                                type: 'success',
                                                message: res.msg
                                            })
                                            that.$emit('closed', true)
                                            that.close()
                                        } else {
                                            that.$msgbox({
                                                type: 'error',
                                                message: res.msg
                                            })
                                        }
                                        that.loading = false
                                    })
                                }
                            }
                        })
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