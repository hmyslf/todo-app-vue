import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    isLogin: false,
    errorMessage: '',
    successMessage: ''
  },
  mutations: {
    SET_TODOS (state, payload) {
      state.todos = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ERROR (state, payload) {
      state.errorMessage = payload
    },
    SET_SUCCESS (state, payload) {
      state.successMessage = payload
    }
  },
  actions: {
    getTodos ({ commit }) {
      return server.get('/todos', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SET_TODOS', data.Todos)
        })
    }
  },
  modules: {
  }
})
