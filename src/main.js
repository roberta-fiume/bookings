
/* eslint-disable no-unused-vars*/ 

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// import VueJwtDecode from 'vue-jwt-decode';

import auth from '@/auth'
Vue.use(auth)

// Vue.use(VueJwtDecode);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // VueJwtDecode,
  render: h => h(App)
}).$mount('#app')
