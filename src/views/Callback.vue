
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
    id_Token() {
      return this.$store.getters.idToken;
    },

    decodedIdToken() {
      return jwt_decode(this.id_Token);
    }
  },
    
  mounted() {
     if (this.token) {
      this.isUserLoggedIn = true;
     }

     
     console.log("THIS IS THE DECONDED ID TOKEN",this.decodedIdToken);

  },
   methods: {
     ...mapActions(['logout']),

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