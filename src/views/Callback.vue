
<template>
    <div>
        <div>
            Welcome, you're logged in!
        </div>
        <v-btn @click="logout">
        Logout
        </v-btn>
      <v-btn>
      <router-link to="/bookslot" > Book delivery </router-link>
      </v-btn>
           <v-btn>
          <router-link to="/"> Home </router-link>
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
    audience: 'https://supermarket.com', 
    responseType: 'token id_token',
    scope: 'openid profile' 
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
      this.storeToken();
    },

 
  methods: {
      logout() {
        console.log("I WORK, LOGOUT");
        return new Promise((resolve, reject) => { 
          webAuth.logout({
            returnTo: 'http://localhost:3000', // Allowed logout URL listed in dashboard
            clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0', // Your client ID
          })
        })
      },

      storeToken() {
         let hashValue = this.$route.hash;
          console.log("THIS IS HASH", this.$route.hash);
          if (!hashValue) {
              this.$router.push("/"); //after valid login the #token comes back as a hash value no token means user didnt just login
          } else {
              try {
                  let tokensString = hashValue.substring(1, hashValue.length); //remove the # in the string
                  let parsedTokens = querystring.parse(tokensString);
                  console.log("parsed token",parsedTokens)
                  this.$store.commit("update_auth_tokens", parsedTokens);
              } catch (e) {
                  this.$router.push("/");
              }
          }
        },


        //   webAuth.parseHash((err, authResult) => {
        //   if(authResult) {
        //   window.location.hash = '';
        //   let token = authResult.accessToken;
        //   this.$store.commit("update_auth_tokens", token);
        //   console.log("this is the tokennnnn!!!!!",token);
        //   } else if (err) {
        //       console.log("ERROR", err)
        //   }
        // });
    
  }
}
</script>