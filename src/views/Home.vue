<template>
  <div class="home">
    <h1> Welcome to Markedona</h1>
    <v-btn>
     
     <span class="material-icons">
        account_circle
     </span>
       My Account 
    </v-btn>
    <v-btn>
      <router-link to="/bookslot" > Book delivery </router-link>
    </v-btn>
    <v-btn @click="login">
     Login
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
    audience: 'https://dev-23ynikm5.eu.auth0.com/api/v2/', 
    responseType: 'token',
    scope: 'openid' 
  })

const axios = require('axios');

export default {
  name: 'Home',
  components: {

  },

  data() {
    return {

    }
  },

  methods: {
      login() {
        console.log("I WORK, LOGIN");
        webAuth.authorize();  
        // webAuth.loginWithRedirect();
      },
  }
}
</script>
