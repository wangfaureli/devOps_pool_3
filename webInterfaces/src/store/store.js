import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";
import { apiUrl } from "../settings.js";
// import { reject } from 'core-js/fn/promise';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: window.localStorage.getItem("user_id") || null,
    roleLevel: window.localStorage.getItem("roleLevel") || null,
    IsUserAuthenticated: false,
  },
  mutations: {},
  actions: {
    recoverUserInfo(context, info) {
      console.log(info);
      let data = JSON.stringify({
        user: {
          username: info.username,
          password: info.password,
        },
      });

        fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:4000",
          },
          //credentials: 'include',
          body: data,
        }).then((resp) => {
          console.log(resp)
          // const content = await rawResponse.json();
          // console.log(content["message"]);
  
          // if (content["message"] == "user connected") {
          //   this.dispatch("beforeEach", {});
          // }


          fetch(`${apiUrl}/check-token`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: '',
          }).then((test) => {
  
            // const content = rawResponse.json();
            console.log(test);      
          });
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
