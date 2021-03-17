import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: "",
    accessToken: "",
    tokensExpiry: "",
  },

  getters: {
    // tokensExpiry: state => state.tokensExpiry,
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
  },

  mutations: {
      update_auth_tokens(state, tokenData) {
          localStorage.setItem("access_token", tokenData.access_token);
          state.accessToken = localStorage.getItem("access_token");

    
          localStorage.setItem("id_token", tokenData.id_token);
          state.idToken = localStorage.getItem("id_token");

          // const tokensExpiry = addSeconds(new Date(), tokenData.expires_in || tokenData.expiresIn);
          // state.tokensExpiry = tokensExpiry;
          // localStorage.setItem("tokensExpiry", tokensExpiry);
          // localStorage.setItem("expires_in", tokensExpiry);
      }
  },
  actions: {},

 
})
