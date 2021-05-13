<template>
  <div class="home">

    <div class="home__header">
      <div class="home__header-brand" >
        <h1> Markedona</h1> 
      </div>

      <div class="home__header-search">
        <input type="text" placeholder="Search.." class="home__header-search-input">

        <div class="home__header-search-wrapper">
          <div class="home__header-search-empty">
          </div>
          <i class="fa fa-search home__header-search-icon "></i>
        </div>
    
      </div>
 
      <div class="home__header-buttons">
        <v-btn class="home__header-buttons-login" v-if="!isUserLoggedIn" @click="login">
            Register/Login
        </v-btn> 
      
        <v-btn class="home__header-buttons-login" v-if="isUserLoggedIn" @click="logout">
            Logout
        </v-btn>

        <v-btn class="home__header-buttons-book-delivery" v-if="isUserLoggedIn">
          <router-link class="home__header-buttons-book-delivery-text" to="/bookslot"> Book delivery </router-link>
        </v-btn>
    
        <span class="material-icons home__header-buttons-shopping">
            shopping_cart
        </span>
      </div> 
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

    <!-- <div> I AM LOGGED IN: {{ isUserLoggedIn }} </div> -->
    
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
@import "../styles/vuetify-classes.scss";
@import "../styles/mixins.scss";



  .home {
    &__header {
      @include flexProperties(row);
      margin-top: 20px;


      &-brand {
        @include textProperties(15px);  
      }

      &-search {
        color: $primary;
        @include p-left-right(10px, 10px);
        @include measures(330px, 40px);
        @include borderProperties(2px solid $primary);
        @include flexProperties(row, space-between, center);
      }

      &-search-empty {
        display: flex;
        border: 1px solid $primary;
        @include measures(1px, 40px);
      }

      &-search-wrapper {
        margin-right: -10px;
        width: 35px;
        background-color: $primary;
        @include flexProperties(row, space-between, center);
      }

      &-search-icon {
        color: $white;
        margin-right: 7px;
      }

     input::placeholder {
        color: $primary;
      }

      &-search-input {
        outline: none;
      } 

      &-buttons {
        @include flexProperties(row);
      }

      &-buttons-login {
        color: $white !important;
        margin-left: 30px;
        @include textProperties(16px);
      }

      &-buttons-book-delivery {
        color: $white !important;
        margin-left: 30px;
        @include textProperties(15px);
      }

      &-buttons-book-delivery-text {
        color: $white !important;
        text-decoration: none;
        @include textProperties(14px);
      }

      &-buttons-shopping {
        margin-top: 10px;
        @include m-left-right(30px, 5px);
        color: $primary;
      }
    }
  }
  .offers {
    height: 180px;
    border: 2px solid lightseagreen;
    
  }

 

</style>
