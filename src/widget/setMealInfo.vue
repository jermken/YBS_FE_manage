<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="卡类信息" width="500px" :before-close="beforeClose" @close="resetFields('setMealInfoForm')">
    <el-form :model="setmealInfo" status-icon :rules="formRules" ref="setMealInfoForm" :size="globalSize">
        <el-form-item required label="套餐名称" label-width="80px" prop="name">
            <el-input placeholder="请输入套餐名称" v-model="setmealInfo.name"></el-input>
        </el-form-item>
        <el-form-item required label="套餐价格" label-width="80px" prop="total">
            <el-input placeholder="请输入价格" v-model="setmealInfo.total"></el-input>
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
        <el-form-item label="备注" label-width="80px" prop="desc">
            <el-input type="textarea" v-model="setmealInfo.desc" :rows="3" :autosize="false"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="confirmEvent('setMealInfoForm')" :size="globalSize" type="primary">提交</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    // 套卡详情组件
    name: 'SetmealInfo',
    props: {
        setmeal_id: null,
        show: false
    },
    data() {
        return {
            setmealInfo: {
                name: '',
                total: '',
                date: '',
                sub_project: '',
                sub_times: '',
                desc: ''
            },
            formRules:{
                name: [{
                    required: true,
                    message: '名称不能为空',
                    trigger: 'blur'
                }],
                total: [{
                    required: true,
                    message: '请填写价格',
                    trigger: 'blur'
                }]
            },
            projectList: [{name: '', times: ''}]
        }
    },
    watch: {
        'setmeal_id': function(val) {
            val && this.fetchSetMealInfo(val)
        },
        'setmealInfo.date': function(val) {
            console.log(val)
        },
        'setmealInfo.sub_project': function() {
            let obj = []
            let nameList = this.setmealInfo.sub_project.split(',')
            let timesList = this.setmealInfo.sub_times.split(',')
            for(let i = 0; i < nameList.length; i++) {
                obj[i] = {
                    name: nameList[i] || '',
                    times: timesList[i] || ''
                }
            }
            this.projectList = obj
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.show
        }
    },
    methods: {
        async fetchSetMealInfo(id) {
            console.log(id)
            // TODO: 拉取卡类信息
            let SETMEAL_LIST = {
                id: 1,
                name: '国庆活动套卡',
                total: 200,
                date: '2018-09-01,2018-12-30',
                sub_project: '美甲，洗脸,化妆',
                sub_times: '1,1,1'
            }
            SETMEAL_LIST.date = SETMEAL_LIST.date.split(',')
            this.setmealInfo = SETMEAL_LIST
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
        },
        addItem(idx) {
            this.projectList.splice(idx+1, 0, {name: '', times: ''})
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