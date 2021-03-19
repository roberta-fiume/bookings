import Vue from 'vue'
import Vuex from 'vuex'

import auth0 from 'auth0-js'

Vue.use(Vuex)

let webAuth = new auth0.WebAuth({
  domain: 'dev-23ynikm5.eu.auth0.com',
  clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://supermarket.com', 
  responseType: 'token id_token',
  scope: 'openid profile' 
});
/* eslint-disable no-unused-vars*/ 
export default new Vuex.Store({
  state: {
    idToken: "",
    accessToken: "",
    tokensExpiry: "",
    isUserLoggedIn: false,
  },

  getters: {
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    isUserLoggedIn: state => state.isUserLoggedIn,
  },

  actions: {
    updateToken({ commit }, accessToken) {
      commit('update_auth_tokens', accessToken);
    },

    login({ commit }) {
      console.log("I WORK, LOGIN");
      webAuth.authorize(); 
      commit('setIsUserLoggedInToTrue'); 
    
      // webAuth.loginWithRedirect();
    },

    logout({ commit }) {
      console.log("I WORK, LOGOUT");
      return new Promise((resolve, reject) => { 
        webAuth.logout({
          returnTo: 'http://localhost:3000', // Allowed logout URL listed in dashboard
          clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0', // Your client ID
        });
        commit('setIsUserLoggedInToFalse');
      })
    },
  },

  mutations: {
    update_auth_tokens(state, tokenData) {
      localStorage.setItem("access_token", tokenData.access_token);
      state.accessToken = localStorage.getItem("access_token");

      console.log("token in store", this.state.accessToken);
      console.log("token in getters", this.getters.accessToken);

      localStorage.setItem("id_token", tokenData.id_token);
      state.idToken = localStorage.getItem("id_token",tokenData.id_token);
    },

    setIsUserLoggedInToTrue: (state) => state.isUserLoggedIn = true,

    setIsUserLoggedInToFalse: (state) => state.isUserLoggedIn = false,
  },

 
})
