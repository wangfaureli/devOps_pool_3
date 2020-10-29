import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import router from './router';
import store from './store/store';

Vue.use(Router);


Vue.prototype.userId = '';

new Vue({
  router,
  store,
  async mounted() {
    Vue.prototype.userId = this.$route.params.userId;
  },
  render: (h) => h(App),
}).$mount('#app');
