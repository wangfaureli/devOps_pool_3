import Vue from 'vue';
import Router from 'vue-router';
import WorkingTimes from './components/WorkingTimes.vue';
import WorkingTime from './components/WorkingTime.vue';
import ClockManager from './components/ClockManager.vue';
import Clocks from './components/Clocks.vue';
import ChartManager from './components/ChartManager.vue';
import Unavailabilities from './components/Unavailabilities.vue';
import login from './components/Auth/Login.vue';
import logout from './components/Auth/Logout.vue';
import register from './components/Auth/Register.vue';
import dashBoard from './components/DashBoard.vue';
import store from './store/store';
// import axios from 'axios';
// import { apiUrl } from '@/settings';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/unavailabilities/',
      name: 'Unavailabilities',
      component: Unavailabilities,
    },
    {
      path: '/workingTimes/',
      name: 'workingTimes',
      component: WorkingTimes,
    },
    {
      path: '/workingtimes/add',
      name: 'workingTime',
      component: WorkingTime,
    },
    {
      path: '/workingTime/:userId/:workingTimeId',
      name: 'workingTimesUserAndWorking',
      component: WorkingTime,
    },
    {
      path: '/clock-manager',
      name: 'clockManager',
      component: ClockManager,
    },
    {
      path: '/clocks',
      name: 'clocks',
      component: Clocks,
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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashBoard,
    },
    { path: '/', redirect: '/dashboard' },
  ],
});

router.beforeEach((to, from, next) => {
    
  if(!store.getters.getIsAuthenticated)
  {
    if(to.path == '/dashboard' ||to.path == '/sign_in' )
    {
      console.log(to.path)
    }else{
      router.push('sign_in')
    }
  }

     next();
  });

export default router;
