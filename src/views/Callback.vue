
<template>
    <div>
        <div>
            Welcome, you're logged in!
        </div>
        <v-btn @click="logout">
        Logout
        </v-btn>
    </div>
</template>

<script>
/* eslint-disable no-unused-vars*/ 

import querystring from "querystring";

import auth0 from 'auth0-js'



let webAuth = new auth0.WebAuth({
    domain: 'dev-23ynikm5.eu.auth0.com',
    clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://dev-23ynikm5.eu.auth0.com/api/v2/', 
    responseType: 'token',
    scope: 'openid' 
  })
export default {
  name: 'callback',
 components: {

  },

  data() {
    return {
        
    }
  }, 

    created() {
        //   console.log("TOKEN",this.$route.params.token)
        console.log("I WORK, callback");

    },

    mounted() {
            let hashValue = this.$route.hash;
            if (!hashValue) {
                this.$router.push("/"); //after valid login the #token comes back as a hash value no token means user didnt just login
            } else {
                try {
                    let tokensString = hashValue.substring(1, hashValue.length); //remove the # in the string
                    let parsedTokens = querystring.parse(tokensString);
                    console.log("parsed token",parsedTokens)
                    // this.$store.commit("account/update_auth_tokens", parsedTokens);
                    // this.$router.push("/");
                } catch (e) {
                    this.$router.push("/");
                }
            }
    },

  methods: {
      logout() {
        console.log("I WORK, LOGOUT");
        return new Promise((resolve, reject) => { 
          // localStorage.removeItem('access_token')
          // localStorage.removeItem('id_token')
          // localStorage.removeItem('expires_at')
          // localStorage.removeItem('user')
          webAuth.logout({
            returnTo: 'http://localhost:3000', // Allowed logout URL listed in dashboard
            clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0', // Your client ID
          })
        })
      }
  }
}
</script>