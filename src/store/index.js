import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: "",
    accessToken: "",
    tokensExpiry: "",
    isUserLoggedIn: false,
  },

  getters: {
    // tokensExpiry: state => state.tokensExpiry,
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    isUserLoggedIn: state => state.isUserLoggedIn,
  },

  actions: {
    updateToken({ commit }, accessToken) {
      commit('update_auth_tokens', accessToken);
  
    },
  },

  mutations: {
      update_auth_tokens(state, tokenData) {
          localStorage.setItem("access_token", tokenData.access_token);
          state.accessToken = localStorage.getItem("access_token");
          console.log("token in store", this.state.accessToken);
          console.log("token in getters", this.getters.accessToken);
          // localStorage.setItem("id_token", tokenData.id_token);
          state.idToken = localStorage.getItem("id_token",tokenData.id_token);
          // const tokensExpiry = addSeconds(new Date(), tokenData.expires_in || tokenData.expiresIn);
          // state.tokensExpiry = tokensExpiry;
          // localStorage.setItem("tokensExpiry", tokensExpiry);
          // localStorage.setItem("expires_in", tokensExpiry);
    },

    setIsUserLoggedInToTrue: (state) => state.isUserLoggedIn = true,

    setIsUserLoggedInToFalse: (state) => state.isUserLoggedIn = false,
  },

 
})
