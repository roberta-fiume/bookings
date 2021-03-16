
<template>
    <div>
        <div>
            Welcome, you're logged in!
        </div>
    </div>
</template>

<script>
/* eslint-disable no-unused-vars*/ 
export default {
  name: 'callback',
 components: {

  },

  data() {
    return {
        
    }
  }, 
  methods: {
      created() {
        //   console.log("TOKEN",this.$route.params.token)
        console.log("I WORK, callback");

      }
  }
}
</script>