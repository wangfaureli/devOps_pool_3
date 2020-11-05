<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-collapse" id="navbarNav">
        <ul
          class="navbar-nav"
          v-if="this.$store.getters.getIsAuthenticated == true"
        >
          <li class="nav-item">
            <router-link :to="{ name: 'dashboard' }" class="nav-link"
              >DashBoard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'workingTimes' }" class="nav-link"
              >Working Times</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Unavailabilities' }" class="nav-link"
              >Unavailabilities</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'clocks' }" class="nav-link"
              >Clocking</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'account' }" class="nav-link"
              >My Account</router-link
            >
          </li>
          <li class="nav-item" v-if="this.$store.getters.getRoleLevel != 3">
            <router-link :to="{ name: 'userlist' }" class="nav-link"
              >User List</router-link
            >
          </li>
          
          <li class="nav-item" @click="logout()">
            <router-link :to="{ name: 'signOut' }" class="nav-link"
              >Logout</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="this.$store.getters.getIsAuthenticated == false"
          >
            <router-link :to="{ name: 'signIn' }" class="nav-link"
              >Login</router-link
            >
          </li>
        </ul>
        <ul v-else  class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'dashboard' }" class="nav-link"
              >DashBoard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'signIn' }" class="nav-link"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- <div v-if="userId">
      <User />
    </div>
    <div v-else class="d-flex justify-content-center flex-column align-items-center mt-5">
      <h3>Bienvenue sur le Time Manager</h3>
      <p class="">Veuillez selectionner un menu,car vous le constatez, il n'y a rien ici !</p>
    </div> -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template> 

<script>
//import User from "./components/User.vue";
export default {
  name: "App",
  data() {
    return {
      UserId: this.$store.getters.getUserId,
    };
  },
  components: {
    //User,
  },
  created() {
    if (this.userId == "") {
      this.userId = 1;
    }
  },
  methods: {
    goto(route) {
      console.log(this.$router.currentRoute);
      // this.$router.currentRoute.path = "";
      this.$router.push(route);
      // this.$router.go();
    },
    logout() {
      this.$store.commit("setUserLogout");
      this.$router.push("/sign_in");
    },
  },
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
