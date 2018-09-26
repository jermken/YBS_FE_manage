import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    globalSize: 'small',
    userPower: {}
}
const actions = {
    setGlobalSize ({ commit }) {
        let globalSize = window.innerWidth > 1540 ? 'small' : 'mini'
        commit('GLOBAL_SIZE', globalSize)
    },
    getUserPower ({ commit }) {
        let res = {}
        commit('USER_POWER', res)
    }
}
const mutations = {
    GLOBAL_SIZE (state, globalSize) {
        state.globalSize = globalSize
    },
    USER_POWER (state) {
        state.userPower = obj
    }
}
const getters = {
    globalSize: state => state.globalSize,
    userPower: state => state.userPower
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})