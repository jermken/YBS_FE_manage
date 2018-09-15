import VueRouter from 'vue-router'

const Bill = () => import(/* webpackChunkName: "billPage" */ '@/pages/bill')
const Book = () => import(/* webpackChunkName: "bookPage" */ '@/pages/book')
const Card = () => import(/* webpackChunkName: "cardPage" */ '@/pages/card')
const Payment = () => import(/* webpackChunkName: "paymentPage" */ '@/pages/payment')
const SetMeal = () => import(/* webpackChunkName: "setMealPage" */ '@/pages/setMeal')
const Store = () => import(/* webpackChunkName: "storePage" */ '@/pages/store')
const Total = () => import(/* webpackChunkName: "totalPage" */ '@/pages/total')
const User = () => import(/* webpackChunkName: "userPage" */ '@/pages/user')
const Staff = () => import(/* webpackChunkName: "staffPage" */ '@/pages/staff')
const Other = () => import(/* webpackChunkName: "otherPage" */ '@/pages/other')
const routes = [
    { path: '/', redirect: '/bill' },
    { path: '/bill', component: Bill },
    { path: '/book', component: Book },
    { path: '/card', component: Card },
    { path: '/payment', component: Payment },
    { path: '/setMeal', component: SetMeal },
    { path: '/store', component: Store },
    { path: '/total', component: Total },
    { path: '/user', component: User },
    { path: '/other', component: Other },
    { path: '/staff', component: Staff }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router