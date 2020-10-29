import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { reject } from 'core-js/fn/promise'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: window.localStorage.getItem('access_token') || null, 
    },
    mutations: {
      
    },
    actions:{
        recovertoken(context, credentials) {
            console.log(credentials);
            return new Promise((resolve, reject) =>{
                axios.post('/users/sign_in',{
                    email: credentials.email,
                    password: credentials.password,
                })
                .then(response => {
                    const token = response.data.access_token
                    localStorage.setItem('access_token', token)
                    context.commit('recovertoken', token)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        }
    }
  })
  