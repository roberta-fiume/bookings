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

    <div class="offers" v-if="isLoggedIn">
      <p>These offers are selected just for you:</p>
      <div>
        Fusilli pasta: £3
      </div>
      <div>
        Organic chicken thights: £5per kg
      </div>  
    </div>

    <v-btn v-if="isLoggedIn" @click="logout">
      Logout
    </v-btn>
    
  </div>
</template>

<script>

/* eslint-disable no-unused-vars*/ 
import auth0 from 'auth0-js'

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
    ...mapActions(['login', 'logout']),
  }
}
</script>

<style lang='scss'>
  .offers {
    height: 200px;
    border: 2px solid lightseagreen;
  }

</style>
