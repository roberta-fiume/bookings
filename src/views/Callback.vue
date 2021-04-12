
<template>
    <div>
      <div>
          Welcome, {{decodedIdToken.nickname }}!
      </div>
      <v-btn @click="logout">
      Logout
      </v-btn>

      <v-btn>
      <router-link to="/bookslot"> Book delivery </router-link>
      </v-btn>

      <v-btn>
          <router-link to="/"> Home </router-link>
      </v-btn> 

      <div> I AM LOGGED IN: {{ isUserLoggedIn }} </div>
      
  </div> 
</template>

    
<script>
/* eslint-disable no-unused-vars*/ 


import querystring from "querystring";

import auth0 from 'auth0-js';
import jwt_decode from "jwt-decode";


import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

const axios = require('axios');


export default {
name: 'callback',
 components: {

  },

  data() {
    return {
      isUserLoggedIn: false,
    }
  }, 

  created() {
    this.storeToken();
  },

  computed: {
    token(){
      return this.$store.getters.accessToken;
    },
 
    decodedToken() {
      return jwt_decode(this.token);
    },

    decodedIdToken() {
      return this.$store.getters.getDecodedIdToken;
    }
  },
    
  mounted() {
     if (this.token) {
      this.isUserLoggedIn = true;
     }

     console.log("THIS IS TOKEN", this.token);

      this.$store.dispatch('decodeIdToken');

     console.log("DECODED TOKEN", this.decodedIdToken);
   
      //  this.getUserInfo();


     const userId = this.removeStringFromUserId();

     console.log("USER ID", userId);

  },
   methods: {
     ...mapActions(['logout', 'decodeIdToken']),

    storeToken() {
      let hashValue = this.$route.hash;
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

    removeStringFromUserId() {
       const userIdFullString = this.decodedIdToken.sub;

       const userId = userIdFullString.replace("auth0|","");
       
       return userId;
    },
 
    getUserInfo() {
      let url = "https://dev-23ynikm5.eu.auth0.com/userinfo"
       const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }

      console.log("HEADERSSSSS", headers);
      axios.get(url, {
        headers: headers
      }).then(response => {
        console.log("USER INFOO", response)
      })
      .catch(error => {
        console.log("this is the error", error);
      });
    },

    getTokenFromLocalStorage() {
      const token = localStorage.getItem('access_token');
      return token
    }

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