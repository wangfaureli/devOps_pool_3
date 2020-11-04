import Vue from 'vue';
import Router from 'vue-router';
import WorkingTimes from './components/WorkingTimes.vue';
import WorkingTime from './components/WorkingTime.vue';
import ClockManager from './components/ClockManager.vue';
import ChartManager from './components/ChartManager.vue';
import Clock from './components/Clock.vue';
import Account from './components/Account.vue';
import Dashboard from './components/Dashboard.vue'
import Absences from './components/Absences.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import CreateAccount from './components/CreateAccount.vue'
import login from './components/Auth/Login.vue';
import register from './components/Auth/Register.vue';
import store from './store/store';
import axios from "axios";
import { apiUrl } from "@/settings";

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/absences/:userId',
      name: 'absences',
      component: Absences,
    },
    {
      path: '/account/:userId',
      name: 'account',
      component: Account,
    },
    {
      path: '/clock/:userId',
      name: 'clock',
      component: Clock,
    },
    {
      path: '/dashboard/:userId',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/createAccount/',
      name: 'createAccount',
      component: CreateAccount,
    },
    {
      path: '/changePassword/',
      name: 'changePassword',
      component: ForgotPassword,
    },
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
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    { path: '/', redirect: '/workingTimes/1' },
  ],
});

router.beforeEach((to, from, next) => {
  const getCsrfToken = async () => {
    const { data } = await axios.get(`${apiUrl}/check-token`);
    axios.defaults.headers.post['c-xsrf-token'] = data.csrfToken;
   };
  getCsrfToken (); 
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = store.state.userId;
  console.log(currentUser);

  if (authorize) {
      if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/login', query: { returnUrl: to.path } });
      }

      // check if route is restricted by role
      if (authorize.length && !authorize.includes(currentUser.role)) {
          // role not authorised so redirect to home page
          return next({ path: '/' });
      }
  }

  next();
})

export default router;
