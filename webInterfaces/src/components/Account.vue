<template>
  <div id="conteneur">
    <div class="center content-inputs">
      <h5>My Informations :</h5>
      <vs-input
        state="dark"
        primary
        placeholder="UserName"
        v-model="username"
      />
      <vs-input state="dark" primary placeholder="Name" v-model="firstname" />
      <vs-input
        state="dark"
        primary
        placeholder="Last  Name"
        v-model="lastname"
      />
      <vs-input state="dark" primary placeholder="Email" v-model="email" />
      <vs-input
        state="dark"
        primary
        type="password"
        v-model="password"
        placeholder="New Password"
      />
      <vs-input
        state="dark"
        primary
        type="password"
        v-model="confirmPwd"
        placeholder="Confirm Password"
      />
      <div id="bouton">
        <vs-button circle :active="active == 0" @click="submit">
          <b>Valid Changes</b>
        </vs-button>
      </div>
      <div>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import bcrypt from "bcryptjs";
import { apiUrl } from "@/settings";
export default {
  data: () => ({
    currentuserId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    pwd: "",
    confimrPwd: "",
    message: ""
  }),
  async mounted() {
    // On call l'api pour avoir l'id de l'utilisateur courant
    // var user = await api.getUser(this.userId);
    // this.currentuserId = user.Id;
    // this.username = user.username;
    // this.fistname = user.firstname;
    // this.lastname = user.lastname;
    // this.email = user.email;
    //On ne set pas le mdp car on obtient un hash.
  },
  methods: {
    getUserPage(user) {
      let currentRoute = this.$route.matched[0].path;
      let currentRegex = /:userId/gi;
      let gotoRoute = currentRoute.replace(currentRegex, user);
      this.$router.push(gotoRoute);
      this.$router.go();
    },
    async submit() {
        if(this.pwd != this.confimrPwd){
            this.message = "Invalid password confirmation.";
        }
      let pwdHash;
      let rounds = 10;
      bcrypt.hash(this.password, rounds, (err, hash) => {
        if (err) {
          console.error(err);
          return;
        }
        else{
            pwdHash = hash;
            return;
        }
      });
        const response = await axios.put(`${apiUrl}/user/${this.currentUserId}`, {
        user: {
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: pwdHash,
        }
        });
        this.message = response.data.message;
    },
  },
};
</script>
<style>
.vs-input {
  margin-bottom: 3%;
}
#bouton {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
#conteneur {
  border-radius: 2%;
  width: 30%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>