import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import router from './router';

Vue.use(Router);


Vue.prototype.userId = '';

new Vue({
  router,
  async mounted() {
    Vue.prototype.userId = this.$route.params.userId;
  },
  render: (h) => h(App),
}).$mount('#app');
