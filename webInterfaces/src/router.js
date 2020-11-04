import Vue from 'vue';
import Router from 'vue-router';
import WorkingTimes from './components/WorkingTimes.vue';
import WorkingTime from './components/WorkingTime.vue';
import ClockManager from './components/ClockManager.vue';
import ChartManager from './components/ChartManager.vue';
import login from './components/Auth/Login.vue';
import logout from './components/Auth/Logout.vue';
import register from './components/Auth/Register.vue';
// import store from './store/store';
// import axios from 'axios';
// import { apiUrl } from '@/settings';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/workingTimes/:userId',
      name: 'workingTimes',
      component: WorkingTimes,
    },
    {
      path: '/workingTime/:userId',
      name: 'workingTime',
      component: WorkingTime,
    },
    {
      path: '/workingTime/:userId/:workingTimeId',
      name: 'workingTimesUserAndWorking',
      component: WorkingTime,
    },
    {
      path: '/clock/:userId',
      name: 'clock',
      component: ClockManager,
    },
    {
      path: '/chartManager/:userId',
      name: 'chart',
      component: ChartManager,
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: login,
    },
    {
      path: '/sign_out',
      name: 'signOut',
      component: logout,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    { path: '/', redirect: '/workingTimes/1' },
  ],
});

// router.beforeEach((to, from, next) => {
//   axios
//     .post(
//       `${apiUrl}/check-token`,
//       {},
//       {
//         withCredentials: true,
//       }
//     )
//     .then((test) => {
//       // const content = rawResponse.json();
//       console.log(test);
//     });
// //   getCsrfToken();
// //   // redirect to login page if not logged in and trying to access a restricted page
// //   const { authorize } = to.meta;
// //   const currentUser = store.state.userId;
// //   console.log(currentUser);

// //   if (authorize) {
// //     if (!currentUser) {
// //       // not logged in so redirect to login page with the return url
// //       return next({ path: '/login', query: { returnUrl: to.path } });
// //     }

// //     // check if route is restricted by role
// //     if (authorize.length && !authorize.includes(currentUser.role)) {
// //       // role not authorised so redirect to home page
// //       return next({ path: '/' });
// //     }
// //   }

//   next();
// });

export default router;
