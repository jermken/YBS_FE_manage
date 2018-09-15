import Vue from 'vue'
import App from '../pages/app.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '../route/route.js'

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
    router,
    render: (h) => {
        return h(App)
    }
}).$mount('#app')
