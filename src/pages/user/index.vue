<template>
    <div class="user-page">
        <div class="page-tab-wrapper">
            <el-menu mode="horizontal" router :default-active="currentIndex" background-color="#111" active-text-color="#fff">
                <el-menu-item v-for="item in tabList" :key="item.url" :index="item.url">
                    <template slot="title">{{item.title}}</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="page-tab-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserIndex',
    data() {
        let currentIndex = this.$route.path
        return {
            currentIndex,
            tabList: [{
                title: '普通客户',
                url: '/user/commonUser'
            },{
                title: '会员',
                url: '/user/vipUser'
            },{
                title: '已删客户',
                url: '/user/deleteUser'
            }]
        }
    }
}
</script>
<style lang="scss">

</style>