<template>
    <div class="payment-page">
        <div class="serving-user">服务中客户</div>
        <div class="serving-bill">
            <el-form :model="billInfo" status-icon :rules="formRules" ref="staffInfoForm" :size="globalSize">
                <el-form-item label="客户类别">
                    <el-radio-group v-model="billInfo.userType">
                        <el-radio label="1">游客</el-radio>
                        <el-radio label="2">客户</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="游客姓名" v-if="billInfo.userType == 1">
                    <el-input placeholder="请输入游客姓名"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名" v-else>
                    <el-input placeholder="请输入客户姓名"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Payment',
    data() {
        return {
            billInfo: {
                userType: '1'
            },
            formRules: {

            }
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    }
}
</script>
<style lang="scss">
.serving-user {

}
.serving-bill {

}
</style>