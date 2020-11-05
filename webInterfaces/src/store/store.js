import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { apiUrl } from '../settings.js';
// import { reject } from 'core-js/fn/promise';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: window.localStorage.getItem('userId') || null,
    roleLevel: window.localStorage.getItem('roleLevel') || null,
    IsUserAuthenticated: false,
    clockState: "Stopped",
    clockTime: "00:00:00",
    ClockedIn : false,
    ClockstartingTime : 0,
  },
  getters:{
    getRoleLevel: (state) => {
      return state.roleLevel;
    },
    getUserId: (state) => {
      console.log(state.userId)
      return state.userId;

    },
    getIsAuthenticated: (state) =>{
      return state.IsUserAuthenticated
    },
    getClockState: (state) =>{
      return state.clockState
    },
    getClockTime: (state) =>{
      return state.clockTime
    },
    getClockedIn: (state) =>{
      return state.ClockedIn
    },
    getClockStartingTime: (state) =>{
      return state.ClockstartingTime
    }
  },
  mutations: {
    setUserLogout:(state) =>{
      state.IsUserAuthenticated = false   
    },
    setClockTime: (state, value) =>{      
      state.clockTime = value
    },
    setClockState: (state, value) =>{
      state.clockState = value
    },
    setClockedIn: (state, value) =>{      
      state.ClockedIn = value      
    },
    setClockStartingTime: (state, value) =>{      
      state.ClockstartingTime = value      
    },
  },
  actions: {
    recoverUserInfo(context, info) {

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
          if(resp.data.message == "user connected")
          {     
            this.state.IsUserAuthenticated = true       
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
