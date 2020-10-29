<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="signIn">
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="login-input"
          v-model="email"
        />
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="login-input"
          v-model="password"
        />
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" :disabled="loading">
          <div class="lds-ring-container" v-if="loading">
            <div class="lds-ring">Chargement
            </div>
          </div>
          <div v-else>Login</div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import store from '../../store/store';
// import { mapActions } from 'vuex'


export default {
  name: 'signIn',
  props: {
    dataSuccessMessage: {
      type: String,
    }    
  },
  data(){
    return{
      email: '',
      password: '',
      successMessage: this.dataSuccessMessage,
      loading: false,
      serverError: ''
    }
  },
  methods:{
    signIn(){
      this.loading = true
      this.$store.dispatch('recoverToken',{
        username: this.email,
        password: this.password,
      })
    
    }
  }
};
</script>
