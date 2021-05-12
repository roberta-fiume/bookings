<template>
  <v-app>
    <v-main>
      <router-view/>
        <!-- <BookSlot/> -->
    </v-main>
  </v-app>
</template>

<script>

// import BookSlot from "./views/BookSlot.vue"


export default {
  name: 'App',

  components: {
    // BookSlot,
  },

  data: () => ({
    //
  }),
};
</script>
