import VueRouter from 'vue-router'

const Bill = () => import(/* webpackChunkName: "billPage" */ '@/pages/bill')
const Book = () => import(/* webpackChunkName: "bookPage" */ '@/pages/book')
const Card = () => import(/* webpackChunkName: "cardPage" */ '@/pages/card')
const Payment = () => import(/* webpackChunkName: "paymentPage" */ '@/pages/payment')
const SetMeal = () => import(/* webpackChunkName: "setMealPage" */ '@/pages/setMeal')

const StoreIndex = () => import(/* webpackChunkName: "storePage" */ '@/pages/store')
const Store = () => import(/* webpackChunkName: "storePage" */ '@/pages/store/store')
const JoinStore = () => import(/* webpackChunkName: "storePage" */ '@/pages/store/joinStore')
const OutStore = () => import(/* webpackChunkName: "storePage" */ '@/pages/store/outStore')

const Total = () => import(/* webpackChunkName: "totalPage" */ '@/pages/total')

const User = () => import(/* webpackChunkName: "userPage" */ '@/pages/user')
const CommonUser = () => import(/* webpackChunkName: "userPage" */ '@/pages/user/commonUser')
const VipUser = () => import(/* webpackChunkName: "userPage" */ '@/pages/user/vipUser')
const DeleteUser = () => import(/* webpackChunkName: "userPage" */ '@/pages/user/deleteUser')

const Staff = () => import(/* webpackChunkName: "staffPage" */ '@/pages/staff')
const AllStaff = () => import(/* webpackChunkName: "staffPage" */ '@/pages/staff/allStaff')
const OfflineStaff = () => import(/* webpackChunkName: "staffPage" */ '@/pages/staff/offlineStaff')
const InlineStaff = () => import(/* webpackChunkName: "staffPage" */ '@/pages/staff/inlineStaff')

const Goods = () => import(/* webpackChunkName: "goodsPage" */ '@/pages/goods')
const Other = () => import(/* webpackChunkName: "otherPage" */ '@/pages/other')

const routes = [
    { path: '/', redirect: '/payment' },
    { path: '/bill', component: Bill },
    { path: '/book', component: Book },
    { path: '/card', component: Card },
    { path: '/payment', component: Payment },
    { path: '/setMeal', component: SetMeal },
    { path: '/goods', component: Goods },
    { 
        path: '/store',
        component: StoreIndex,
        children: [{
            path: '/store',
            redirect: '/store/index'
        },{
            path: '/store/index',
            component: Store
        },{
            path: '/store/joinStore',
            component: JoinStore
        },{
            path: '/store/outStore',
            component: OutStore
        }]
    },
    { path: '/total', component: Total },
    { 
        path: '/user',
        component: User,
        children: [{
            path: '/user',
            redirect: '/user/commonUser'
        },{
            path: '/user/commonUser',
            component: CommonUser
        },{
            path: '/user/vipUser',
            component: VipUser
        },{
            path: '/user/deleteUser',
            component: DeleteUser
        }]
    },
    { path: '/other', component: Other },
    { 
        path: '/staff',
        component: Staff,
        children: [{
            path: '/staff',
            redirect: '/staff/inlineStaff'
        },{
            path: '/staff/inlineStaff',
            component: InlineStaff
        },{
            path: '/staff/offlineStaff',
            component: OfflineStaff
        },{
            path: '/staff/allStaff',
            component: AllStaff
        }]
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router