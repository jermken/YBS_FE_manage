<template>
    <div class="staff-page">
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
    name: 'Staff',
    data() {
        let currentIndex = this.$route.path
        return {
            currentIndex,
            tabList: [{
                title: '在职员工',
                url: '/staff/inlineStaff'
            },{
                title: '全部员工',
                url: '/staff/allStaff'
            },{
                title: '离职员工',
                url: '/staff/offlineStaff'
            }]
        }
    }
}
</script>
<style lang="scss">
.staff-page {

}
</style>