<template>
  <div class="home">
    <div class="home__brand" >
        <h1> Markedona</h1> 
    </div>

    <div class="home__search">
      <input type="text" placeholder="Search.." class="home__search-input">

      <div class="home__search-wrapper">
        <div class="home__search-empty">
        </div>
        <i class="fa fa-search home__search-icon "></i>
      </div>
   
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
    @include flexProperties(row);
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
      padding-left: 10px;
      padding-right: 10px;
      color: $primary;
      width: 330px;
      height: 40px;
      @include border(2px solid $primary);
      @include flexProperties(row, space-between, center);

      &-empty {
        display: flex;
        border: 1px solid $primary;
        width: 1px;
        height: 40px
      }

      &-wrapper {
        margin-right: -10px;
        width: 35px;
        background-color: $primary;
        @include flexProperties(row, space-between, center);
      }

      &-icon {
        color: $white;
        margin-right: 7px;
      }
    }
  }
  .offers {
    height: 180px;
    border: 2px solid lightseagreen;
    
  }

 

</style>
