<template>
    <div class="body-content">
        <div class="manage-wrapper" v-if="currentNav !== '/login'">
            <div class="header">
                <img class="header-logo" src="../img/eps_logo.png"/>
                <div class="header-admin">
                    <el-popover trigger="hover" placement="bottom">
                        <div class="header-admin__content">
                            <ul class="header-admin__content__list">
                                <li><span class="header-admin__content__text">用户名：</span>{{userInfo.name}}</li>
                                <li><span class="header-admin__content__text">性别：</span>{{userInfo.sexual == 1 ? '女' : '男'}}</li>
                                <li><span class="header-admin__content__text">身份：</span>{{userInfo.role}}</li>
                            </ul>
                            <el-button type="primary" size="mini" round plain @click="passwordChange">修改密码</el-button>
                            <el-button type="primary" size="mini" round plain @click="loginOut">退出登录</el-button>
                        </div>
                        <div slot="reference" class="header-admin__info">
                            <img class="header-admin__avatar" src="../img/user.png" />
                            <span class="header-admin__name">{{userInfo.name}}</span>
                        </div>
                    </el-popover>
                </div>
            </div>
            <div class="main">
                <div class="nav-wrapper">
                    <ul class="nav-list">
                        <li class="nav-list__item" :class="{active: currentNav.indexOf(item.url) > -1}" v-for="item in navList" :key="item.url">
                            <router-link class="nav-list__item__link" :to="item.url">
                                <img class="nav-list__img" :src="item.imgUrl"/>
                                <span class="nav-list__title">{{item.title}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="main-wrapper">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <login-page v-if="currentNav === '/login'"></login-page>
    </div>
</template>

<script>
import Login from '@/pages/login'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'App',
    data() {
        let currentNav = this.$route.path
        return {
            currentNav,
            userInfo: {
                name: 'jermken',
                sexual: 1,
                role: '管理员'
            },
            navList: [{
                title: '收银',
                imgUrl: require('@/img/payment.png'),
                url: '/payment'
            },{
                title: '预约',
                imgUrl: require('@/img/book.png'),
                url: '/book'
            },{
                title: '卡类',
                imgUrl: require('@/img/card.png'),
                url: '/card'
            },{
                title: '套餐',
                imgUrl: require('@/img/setMeal.png'),
                url: '/setMeal'
            },{
                title: '顾客',
                imgUrl: require('@/img/user.png'),
                url: '/user'
            },{
                title: '订单',
                imgUrl: require('@/img/bill.png'),
                url: '/bill'
            },{
                title: '产品',
                imgUrl: require('@/img/goods.png'),
                url: '/goods'
            },{
                title: '库存',
                imgUrl: require('@/img/store.png'),
                url: '/store'
            },{
                title: '小计',
                imgUrl: require('@/img/total.png'),
                url: '/total'
            },{
                title: '店员',
                imgUrl: require('@/img/staff.png'),
                url: '/staff'
            },{
                title: '定金',
                imgUrl: require('@/img/staff.png'),
                url: '/subscription'
            },{
                title: '其他',
                imgUrl: require('@/img/other.png'),
                url: '/other'
            }]
        }
    },
    components: {
        loginPage: Login
    },
    computed: {
        ...mapGetters(['userPower', 'globalSize'])
    },
    watch: {
        $route: function(obj) {
            this.currentNav = obj.path
        }
    },
    methods: {
        ...mapActions(['setGlobalSize']),
        loginOut() {
            this.$router.push('/login')
        },
        passwordChange() {
            this.$router.push('/login?tab=change')
        },
        initAxiosConfig() {
            axios.defaults.timeout = 2000
            // 添加请求拦截器
            axios.interceptors.request.use((config) => {
                console.log(config)
                return config
            })
            // 添加响应拦截器
            axios.interceptors.response.use((res) => {
                console.log(res)
                // 未登录控制器
                if (res.data && res.data.code === 401) {
                    this.$router.push('/login')
                    // return Promise.reject('未登录')
                }
            })
        }
    },
    created() {
        this.setGlobalSize()
        window.addEventListener('resize', () => {
            this.setGlobalSize()
        })
        this.initAxiosConfig()
    },
    mounted() {
    }
}
</script>
<style lang="scss">
@import '@/scss/common.scss';
@import '@/scss/mixin.scss';
@import '@/scss/variable.scss';
.header {
    height: 80px;
    background: #111;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-logo {
        height: 120px;
        width: auto;
        margin-left: 20px;
    }
    .header-admin {
        cursor: pointer;
        margin-right: 40px;
        &__info {
            display: flex;
            align-items: center;
        }
        &__avatar {
            display: block;
            width: 48px;
            height: 48px;
            border: 2px solid #ceaa70;
            border-radius: 50%;
        }
        &__name {
            margin-left: 20px;
            color: #ceaa70;
        }
    }
}
.main {
    width: 1440px;
    margin: 0 auto;
    @include clearfix;
}
.nav-wrapper {
    float: left;
    width: 200px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 20px;
}
.main-wrapper {
    float: left;
    box-sizing: border-box;
    width: 1220px;
}
.nav-list {
    &__item {
        background: #111;
        width: 100%;
        .nav-list__title {
            color: #ccc;
        }
        &:hover {
            background: $themeActiveColor;
            opacity: 0.5;
        }
        &.active {
            background: $themeActiveColor;
            .nav-list__title {
                color: #fff;
            }
            &:hover {
                background: $themeActiveColor;
                opacity: 1;
            }
        }
        &__link {
            display: block;
            width: 100%;
            padding: 10px 0;
            &:active {
                background: $themeActiveColor;
                opacity: 0.9;
            }
        }
    }
    &__img {
        width: 36px;
        height: 36px;
        margin: 0 10px 0 30px;
    }
}
.header-admin__content {
        &__list {
            margin-bottom: 12px;
            li {
                line-height: 30px;
            }
        }
        &__text {
            display: inline-block;
            width: 60px;
            margin-right: 8px;
        }
}
.page-tab-wrapper {
    border-radius: 4px;
    overflow: hidden;
    .el-menu-item {
        height: 48px !important;
        line-height: 48px !important;
        &.is-active {
            border-bottom-color: $themeActiveColor !important;
            border-bottom-width: 4px !important;
        }
    }
}
.page-form-wrapper {
    padding-top: 18px;
    &.no-tab {
        padding-top: 0;
    }
}
.pagination-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
