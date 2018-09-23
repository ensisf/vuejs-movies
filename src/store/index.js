import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import state from '@/store/state'
import actions from '@/store/actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
