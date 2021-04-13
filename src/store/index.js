
/* eslint-disable no-unused-vars*/ 
import Vue from 'vue'
import Vuex from 'vuex'

import auth0 from 'auth0-js'

import router from '../router'

const axios = require('axios');

import jwt_decode from "jwt-decode";


Vue.use(Vuex)

let webAuth = new auth0.WebAuth({
  domain: 'dev-23ynikm5.eu.auth0.com',
  clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://supermarket.com', 
  responseType: 'token id_token',
  scope: 'openid profile email read:bookings write:bookings read:users read:user_idp_tokens' 
});

export default new Vuex.Store({
  state: {
    idToken: "",
    accessToken: "",
    userId : "",
    decodedIdToken: {},
    tokensExpiry: "",
    
  },

  getters: {
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    getIsUserLoggedIn: state => state.isUserLoggedIn,
    getDecodedIdToken: state => state.decodedIdToken,
    getUserId: state => state.userId,

  },

  actions: {
    updateToken({ commit }, accessToken) {
      commit('update_auth_tokens', accessToken);
    },

    login({ commit, dispatch }) {
      console.log("I WORK, LOGIN");
           webAuth.authorize(); 
    },

    logout({ commit, dispatch }) {
      console.log("I WORK, LOGOUT");
      return new Promise((resolve, reject) => { 
        webAuth.logout({
          returnTo: 'http://localhost:3000', // Allowed logout URL listed in dashboard
          clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0', // Your client ID
        });
        localStorage.removeItem('access_token');
        resolve();
      })
    },

    getUserId({ commit, dispatch }) {
      commit('take_userId');
    },

  },

  mutations: {
    update_auth_tokens(state, tokenData) {
      localStorage.setItem("access_token", tokenData.access_token);
      state.accessToken = localStorage.getItem("access_token");

      console.log("token in store", this.state.accessToken);
      console.log("token in getters", this.getters.accessToken);

      localStorage.setItem("id_token", tokenData.id_token);
      state.idToken = localStorage.getItem("id_token");
    },

    // make a mutation that decodes the id token and dispatch it in callback component 

    take_userId(state) {
   
      state.decodedIdToken = jwt_decode(state.idToken);

      const fullUserId = this.getters.getDecodedIdToken.sub;

      state.userId = fullUserId.replace("auth0|","");

      console.log("USER ID IN STORE", this.getters.getUserId);



      //make it also take the user id 

      
    }
  },

 
})
