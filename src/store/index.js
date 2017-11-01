import Vue from 'vue'
import Vuex from 'vuex'

// state
import state from './state'
// actions
import actions from './actions'
// mutations
import mutations from './mutations'
// getters
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
