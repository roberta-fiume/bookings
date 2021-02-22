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

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {

  },

  data() {
    return {

    }
  }
}
</script>
