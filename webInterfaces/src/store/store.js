import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import { reject } from 'core-js/fn/promise';

Vue.use(Vuex);


const store = new Vuex.Store({ 
  state: {
    xsrfToken: window.localStorage.getItem('access_token') || null,
    userId: window.localStorage.getItem('user_id') || null,
    roleId: window.localStorage.getItem('role_id') || null,
  },
  mutations: {},
  actions: {
    recoverToken(context, credentials) {
      console.log(credentials);
      return new Promise((resolve, reject) => {
        axios
          .post('/users/sign_in', {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem('access_token', token);
            context.commit('recovertoken', token);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
<<<<<<< Updated upstream
=======

      (async () => {
        const rawResponse = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: data
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })()

      // return new Promise((resolve, reject) => {
      //   axios
      //     .post('/users/sign_in', {
      //       email: credentials.email,
      //       password: credentials.password,
      //     })
      //     .then((response) => {
      //       const token = response.data.access_token;
      //       localStorage.setItem('access_token', token);
      //       context.commit('recovertoken', token);
      //       resolve(response);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       reject(error);
      //     });
      // });
>>>>>>> Stashed changes
    },
  },
});

export default store;