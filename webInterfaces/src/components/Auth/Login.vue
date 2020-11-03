<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="signIn">
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          class="login-input"
          v-model="username"
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
            <div class="lds-ring">Chargement</div>
          </div>
          <div v-else>Login</div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
export default {
  name: "signIn",
  props: {
    dataSuccessMessage: {
      type: String,
    },
  },
  data() {
    return {
      username: "",
      password: "",
      successMessage: this.dataSuccessMessage,
      loading: false,
      serverError: "",
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      const username = this.username;      

      bcrypt.hash(this.password, 6).then((hash) => {
        this.$store
          .dispatch("recoverToken", {
            username: username,
            password: hash,
          })
          .then(() => {
            this.$router.push("/");            
          });
      });
    },
  },
};
</script>