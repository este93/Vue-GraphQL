import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from './main'

import { GET_PETS, SIGNIN_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	pets: [],
  	loading: false
  },
  mutations: {
  	setPets: (state, payload) => {
  		state.pets = payload;
  	},
  	setLoading: (state, payload) => {
  		state.loading = payload;
  	}
  },
  actions: {
  	getPets: ({ commit }) => {
  	  commit('setLoading', true);
  	  apolloClient
  	  	.query({
  	  		query: GET_PETS
  	  	}).then(({ data }) => {
  	  		commit('setPets', data.getPets);
  	  		commit('setLoading', false);
  	  	})
  	  	.catch(err => {
  	  		commit('setLoading', false);
  	  		console.error(err);
  	  	})
  	},
    signinUser: ({commit}, payload) =>{
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({data}) => {
          localStorage.setItem('token', data.signinUser.token);
        })
        .catch(err => {
          console.error(err);
        })
    }
  },
  getters: {
  	pets: state => state.pets,
  	loading: state => state.loading
  }
})
