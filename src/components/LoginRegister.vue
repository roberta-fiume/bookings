<template>
    <div class="login-register"> 
       
  
    </div>
</template>

<script>
/* eslint-disable no-unused-vars*/ 

const axios = require('axios');

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {

        }
    },

    computed: {
       
    },

    methods: {
        ...mapActions(['login', 'logout']),
    }
}
</script>

<style lang="scss">

  

</style>