/* eslint-disable no-unused-vars*/ 
import auth0 from 'auth0-js'
import Vue from 'vue'

let webAuth = new auth0.WebAuth({
    domain: 'dev-23ynikm5.eu.auth0.com',
    clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://dev-23ynikm5.eu.auth0.com/api/v2/', 
    responseType: 'token',
    scope: 'openid' 
  })


  let auth = new Vue({
    computed: {
      token: {
        get: function() {
          return localStorage.getItem('id_token')
        },
        set: function(id_token) {
          localStorage.setItem('id_token', id_token)
        }
      },
      accessToken: {
        get: function() {
          return localStorage.getItem('access_token')
        },
        set: function(accessToken) {
          localStorage.setItem('access_token', accessToken)
        }
      },
      expiresAt: {
        get: function() {
          return localStorage.getItem('expires_at')
        },
        set: function(expiresIn) {
          let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
          localStorage.setItem('expires_at', expiresAt)
        }
      },
      user: {
        get: function() {
          return JSON.parse(localStorage.getItem('user'))
        },
        set: function(user) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
    },
    methods: {
      login() {
        console.log("I WORK, LOGIN");
        webAuth.authorize();
      },
      logout() {
        console.log("I WORK, LOGOUT");
        return new Promise((resolve, reject) => { 
          localStorage.removeItem('access_token')
          localStorage.removeItem('id_token')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('user')
          webAuth.logout({
            returnTo: 'http://localhost:3000', // Allowed logout URL listed in dashboard
            clientID: 'Gc9MRwY1bMvx1xkgaP9LsYLuvAOmPqZ0', // Your client ID
          })
        })
      },
      isAuthenticated() {
        return new Date().getTime() < this.expiresAt
      },
      handleAuthentication() {
        return new Promise((resolve, reject) => {  
          webAuth.parseHash((err, authResult) => {
   
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.expiresAt = authResult.expiresIn
              this.accessToken = authResult.accessToken
              this.token = authResult.idToken
              this.user = authResult.idTokenPayload
              resolve()
   
            } else if (err) {
              this.logout()
              reject(err)
            }
   
          })
        })
      }
    }
  })
   
  export default {
    install: function(Vue) {
      Vue.prototype.$auth = auth
    }
  }