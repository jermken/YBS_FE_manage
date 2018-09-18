<template>
    <div class="store-page">
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
    name: 'StoreIndex',
    data() {
        let currentIndex = this.$route.path
        return {
            currentIndex,
            tabList: [{
                title: '库存',
                url: '/store/index'
            },{
                title: '入库',
                url: '/store/joinStore'
            }]
        }
    }
}
</script>
<style lang="scss">

</style>