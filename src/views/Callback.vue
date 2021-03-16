
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
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' });
      console.log("I ROUTED TO HOME!")
    })
  }
}
</script>