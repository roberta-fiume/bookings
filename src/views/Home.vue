<template>
  <div class="home">
    <div class="home__brand" >
        <h1> Markedona</h1> 
    </div>

    <div class="home__search">
        <input type="text" placeholder="Search.."> 
        <i class="fa fa-search home__search-icon "></i>
    </div>

    <div class="home__buttons">
      <v-btn class="home__buttons-login" v-if="!isUserLoggedIn" @click="login">
          Register / Log in
      </v-btn> 
    
      <v-btn v-if="isUserLoggedIn" @click="logout">
          Logout
      </v-btn>

      <v-btn v-if="isUserLoggedIn">
        <router-link to="/bookslot"> Book delivery </router-link>
      </v-btn>
  
      <span class="material-icons home__buttons-shopping">
          shopping_cart
      </span>
    </div> 

    <div class="offers" v-if="isUserLoggedIn">
      <p>These offers are selected just for you:</p>
      <div>
        Fusilli pasta: £3
      </div>
      <div>
        Organic chicken thights: £5per kg
      </div>  
    </div>

    <div> I AM LOGGED IN: {{ isUserLoggedIn }} </div>
    
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
      isUserLoggedIn: false,
    }
  },

  mounted() {
     if (this.token) {
      this.isUserLoggedIn = true;
     }
  },

  computed: {
    token(){
      return this.$store.getters.accessToken;
    }
  },

  methods: {
    ...mapActions(['login', 'logout']),
  }
}
</script>

<style lang='scss'>

@import "../styles/variables.scss";
@import "../styles/_queries.scss";
@import "../styles/vuetify-classes.css";
@import "../styles/mixins.scss";


  .home {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;

    &__brand {
        display: flex;
        flex-direction: row; 
        @include textProperties(15px);
        
    }

    &__buttons {
      display: flex;
      flex-direction: row; 

      &-login {
          background-color: none !important;
          margin-left: 30px;
          @include textProperties(10px);
      }

      &-shopping {
          margin-top: 10px;
          margin-right: 5px;
          margin-left: 30px;
      }
    }

    &__search {
      display: flex;
      width: 300px;
      border: 2px solid #4d2c91;
      border-radius: 7px;
    }

        
    }
  .offers {
    height: 200px;
    border: 2px solid lightseagreen;
  }

  // primary: #7e57c2 P-light: #b085f5 P-Dark: #4d2c91
  // secondary: #4db6ac S-light: #82e9de S-Dark: #00867d

</style>
