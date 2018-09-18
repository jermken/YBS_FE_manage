import Vue from 'vue'
import App from '@/pages/app.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/route/route.js'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(VueRouter)
new Vue({
    router,
    store,
    render: (h) => {
        return h(App)
    }
}).$mount('#app')
