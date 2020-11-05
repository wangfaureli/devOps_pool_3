<template>
  <div class="hidden">
    <vs-navbar shadow square center-collapsed v-model="active">
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" flat icon>
          <b>Time Manager</b>
        </vs-button>
      </template>
      <template #right>
        <vs-button @click="active=!active" v-if="!login" >Login</vs-button>
        <vs-button @click="login=!login" v-if="login">Logout</vs-button>
      </template>
    </vs-navbar>
    <vs-sidebar
      id="navigation"
      absolute
      v-model="activeSidebar"
      :open.sync="activeSidebar"
      >
      <template #header>
        <vs-button @click="activeSidebar = false" flat icon>
          <b>Time Manager</b>
        </vs-button>
      </template>
        <vs-sidebar-item id="dashboard">
          <template #icon>
            <i class='dashboard'></i>
          </template>
          <router-link :to="{ name: 'dashboard', params: { userId: 1 } }" class="nav-link">Dashboard</router-link>
        </vs-sidebar-item>
      <vs-sidebar-item id="account">
        <template #icon>
          <i class='account'></i>
        </template>
        <router-link :to="{ name: 'account', params: { userId: 1 } }" class="nav-link">My Account</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="clock">
        <template #icon>
          <i class='clock'></i>
        </template>
        <router-link :to="{ name: 'clock', params: { userId: 1 } }" class="nav-link">Clock In / Clock Out</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="planning">
        <template #icon>
          <i class='planning'></i>
        </template>
        <router-link :to="{ name: 'chart', params: { userId: 1 } }" class="nav-link">Planning</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="absences">
        <template #icon>
          <i class='absences'></i>
        </template>
        <router-link :to="{ name: 'absences', params: { userId: 1 } }" class="nav-link">Absences</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="workTime">
        <template #icon>
          <i class='workTime' ></i>
        </template>
        <router-link :to="{ name: 'chart', params: { userId: 1 } }" class="nav-link">Worked Hours</router-link>
      </vs-sidebar-item>
    </vs-sidebar>
    <template>
      <vs-dialog v-model="active">
        <template #header>
          <h4 class="not-margin">
           Log In
          </h4>
        </template>
        <form action="#" class="con-form" @submit.prevent="signIn">
          <vs-input v-model="username" placeholder="Username">
          </vs-input>
          <vs-input type="password" v-model="password" placeholder="Password">
          </vs-input>
          <div class="footer-dialog">
            <vs-button block type="submit">
              Sign In
            </vs-button>
          </div>
        </form>
      </vs-dialog>
    </template> 
        <div id ="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data:() => ({
    active: false,
    login: false,
    username: '',
    password: '',
    remember: false,
    activeSidebar: false,
  }),
  created() {
    // if (this.userId == "") {
    //   this.userId = 1;
    // }
  },
  methods: {

    signIn() {
      // this.loading = true;
      console.log(this.username);
      console.log(this.password);
      this.$store
          .dispatch("recoverUserInfo", {
            username: this.username,
            password: this.password,
          })
          .then(() => {            
            this.$router.push("/");            
          });
    },
  }
};
</script>

<style>
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
}
.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-form .flex a {
  font-size: 0.8rem;
  opacity: 0.7;
}
.con-form .flex a:hover {
  opacity: 1;
}
.con-form .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-form .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-form .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}
#navigation {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 100%;
}
</style>