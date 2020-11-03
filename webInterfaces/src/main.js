//import routers from './router';
//import store from './store/store';
import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import WorkingTimes from './components/WorkingTimes.vue';
import WorkingTime from './components/WorkingTime.vue';
import ClockManager from './components/Clock.vue';
import Account from './components/Account.vue';
import Dashboard from './components/Dashboard.vue'
import Absences from './components/Absences.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import CreateAccount from './components/CreateAccount.vue'
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';



Vue.use(Vuesax);
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/ChangePassword/',
      name: 'ChangePassword',
      component: ForgotPassword,
    },
    {
      path: '/CreateAccount/',
      name: 'CreateAccount',
      component: CreateAccount,
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
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/account/:userId',
      name: 'account',
      component: Account,
    },
    {
      path: '/absences/:userId',
      name: 'absences',
      component: Absences,
    },
    { path: '/', redirect: '/dashboard/1'}
  ],
});

Vue.prototype.userId = '';

new Vue({
  router,
  //store,
  async mounted() {
    Vue.prototype.userId = this.$route.params.userId;
  },
  render: (h) => h(App),
}).$mount('#app');
