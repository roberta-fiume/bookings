
/* eslint-disable no-unused-vars*/ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookSlot from '../views/BookSlot.vue'
import Callback from '../views/Callback.vue'
import Register from '../views/Register.vue'

import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/bookslot',
    name: 'BookSlot',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BookSlot.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/callback',
    name: 'callback',
    meta: {
      requiresAuth: true
    },
    component: Callback
  },

  {
    path: '/register',
    name: 'register',
    component: Register
  },

  // { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

const ifAuthenticated = (to, from, next) => {
 if (localStorage.getItem('access_token')) {
   next();
   return;
 }
 router.push({ 
   name: 'home',
   params: {
     returnTo: to.path,
     query: to.query,
   },
 });
};

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('access_token');

//   if (authRequired && !loggedIn) {
//     return next('/');
//   }

//   next();
// })

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     let tokenInRouter = window.localStorage.getItem("access_token");
//     console.log("TOKEN IN ROUTER", tokenInRouter);
//     if (tokenInRouter) {
//       next();
//     } else {
//       console.log("I'M GOING BACK TO HOME!!!");
//       next({ name: "home" });
//     }
//   } else {
//     next()
//   }
// });

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.getIsUserLoggedIn) {
//       next()
//       return
//     }
//     next('/')
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'home' && store.getters.getIsUserLoggedIn) {
//     next({ name: 'home' });
//   } else {
//     next();
//   }
// });



export default router
