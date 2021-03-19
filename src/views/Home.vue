<template>
  <div class="home">
    <h1> Welcome to Markedona</h1>
    <v-btn>
     
     <span class="material-icons">
        account_circle
     </span>
       My Account 
    </v-btn>
    <v-btn v-if="!isLoggedIn" @click="login">
     Login
    </v-btn> 
    <v-btn v-else @click="logout">
      Logout
    </v-btn>
    
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable no-unused-vars*/ 
import auth0 from 'auth0-js'

let webAuth = new auth0.WebAuth({
    domain: 'dev-23ynikm5.eu.auth0.com',
    clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://supermarket.com', 
    responseType: 'token id_token',
    scope: 'openid profile' 
  })

const axios = require('axios');

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {

  },

  data() {
    return {
      // isAuthenticatated: false,
    }
  },

  computed: {
    isLoggedIn () {
        return this.$store.state.isUserLoggedIn
    }
  },

  methods: {
    login() {
      console.log("I WORK, LOGIN");
      webAuth.authorize(); 
      this.$store.commit('setIsUserLoggedInToTrue'); 
    
      // webAuth.loginWithRedirect();
    },

    logout() {
      console.log("I WORK, LOGOUT");
      return new Promise((resolve, reject) => { 
        webAuth.logout({
          returnTo: 'http://localhost:3000', // Allowed logout URL listed in dashboard
          clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0', // Your client ID
        });

        this.$store.commit('setIsUserLoggedInToFalse');
      })
    },
  }
}
</script>
