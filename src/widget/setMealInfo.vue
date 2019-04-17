<template>
<el-dialog :close-on-click-modal="false" :visible.sync="show" title="套餐信息" width="500px" :before-close="beforeClose" @close="resetFields('setMealInfoForm')">
    <el-form :model="setmealInfo" status-icon :rules="formRules" ref="setMealInfoForm" :size="globalSize">
        <el-form-item required label="套餐名称" label-width="80px" prop="name">
            <el-input placeholder="请输入套餐名称" v-model="setmealInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="套餐价格" label-width="80px" prop="price">
            <el-input placeholder="请输入价格" v-model="setmealInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" label-width="80px" prop="date">
            <el-date-picker type="daterange" range-separator="至" v-model="setmealInfo.date" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="套餐项目" label-width="80px" prop="project" style="max-height: 170px!important;overflow-y: auto!important;">
            <span class="setmeal-project-item" v-for="(item,idx) in projectList" :key="idx">
                <span>项目{{idx+1}}</span>
                <el-input style="width: 40%!important;" v-model="item.name"></el-input>
                <span>次数</span>
                <el-input style="width: 15%!important;" v-model="item.times"></el-input>
                <el-button @click="deleteItem(idx)" type="info" circle icon="el-icon-minus"></el-button>
                <el-button @click="addItem(idx)" type="info" circle icon="el-icon-plus"></el-button>
            </span>
        </el-form-item>
        <el-form-item required label="激活" label-width="80px" prop="present_price">
            <el-switch v-model="setmealInfo.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="remark">
            <el-input type="textarea" v-model="setmealInfo.remark" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('setMealInfoForm')" :size="globalSize" type="primary" :loading="loading">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'
let projectTpl = {
    name: '',
    times: 0
}
export default {
    name: 'SetmealInfo',
    mixins: [loader],
    data() {
        return {
            show: false,
            loading: false,
            setmealInfo: {
                name: '',
                price: 0,
                start_time: 0,
                end_time: 0,
                project: '[]',
                status: true,
                remark: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '名称不能为空',
                    trigger: 'blur'
                }],
                price: [{
                    required: true,
                    message: '请填写价格',
                    trigger: 'blur'
                }]
            },
            projectList: [{name: '', times: 0}]
        }
    },
    watch: {
        'setmealInfo.project': (val) => {
            this.projectList = JSON.parse(val)
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchSetMealInfo(id) {
            this.get('getSetMealDetail', { id }).then(res => {
                if (!res.code) {
                    let project =   JSON.parse(res.data.project)
                    let status = !!res.data.status
                    this.setmealInfo = {...res.data, project, status}
                }
            })
        },
        checkProject() {
            let nameArr = [], timesArr = [], isValidate = true
            this.projectList.forEach(item => {
                if (!item.name || !item.times || !/^[1-9]\d*$/.test(item.times)) {
                    isValidate = false
                }
                nameArr.push(item.name)
                timesArr.push(itme.times)
            })
            let arr = new Set(nameArr)
            if (nameArr.length !== [...arr].length) {
                isValidate = false
            }
            return isValidate
        },
        open(id) {
            if (id) {
                this.fetchSetMealInfo(id)
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
                    if (!this.checkProject()) {
                        return this.$message({
                            type: 'error',
                            message: '请检查项目信息是否填写完整或项目名是否存在重复！'
                        })
                    }
                    this.loading = true
                    let api = this.setmealInfo.id ? 'updateSetMeal' : 'addSetMeal'
                    this.setmealInfo.project = JSON.stringify(this.projectList)
                    this.setmealInfo.status = this.setmealInfo.status ? 1 : 0
                    this.post(api, this.setmealInfo).then(res => {
                        if (!res.code) {
                            this.$message({
                                type: 'success',
                                message: this.setmealInfo.id ? '套餐信息更新成功' : '新增套餐成功'
                            })
                            this.$emit('closed', true)
                            this.close()
                        } else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        this.loading = false
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: err
                        })
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
        },
        addItem(idx) {
            this.projectList.splice(idx+1, 0, projectTpl)
        },
        deleteItem(idx) {
            this.projectList.splice(idx,1)
        }
    }
}
</script>
<style lang="scss">
.setmeal-project-item{
    display: block;
    margin-top: 10px;
    &:first-child {
        margin-top: 0px;
    }
}
</style>