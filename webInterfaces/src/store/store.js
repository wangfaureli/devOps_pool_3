import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { apiUrl } from '../settings.js';
// import { reject } from 'core-js/fn/promise';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: window.localStorage.getItem('user_id') || null,
    roleLevel: window.localStorage.getItem('roleLevel') || null,
    IsUserAuthenticated: false,
  },
  getters:{
    getRoleLevel: (state) => {
      return state.roleLevel;
    },
    getUserId: (state) => {
      return state.userId;

    },
  },
  mutations: {},
  actions: {
    recoverUserInfo(context, info) {
      // console.log(info);

      axios
        .post(
          `${apiUrl}/login`,
          {
            user: {
              username: info.username,
              password: info.password,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          // console.log(resp);          
          if(resp.data.message == "user connected")
          {            
            axios
              .post(
                `${apiUrl}/check-token`,
                {},
                {
                  withCredentials: true,
                }
              )
              .then((dataInfos) => {                
                console.log(dataInfos);
                this.state.roleLevel = dataInfos.data.roleLevel,
                this.state.userId = dataInfos.data.userId     
              });
          }

          

        });

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
    },

    // beforeEach() {
    //   this.state.IsUserAuthenticated = true;

    //     fetch(`${apiUrl}/check-token`, {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: '',
    //     }).then((test) => {

    //       // const content = rawResponse.json();
    //       console.log(test);
    //     });

    // },
  },
});

export default store;
