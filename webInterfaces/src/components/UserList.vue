<template>
  <div class="container mt-5 mb-5">
    <hr class="mt-5" />
    <div class="container">
      <div class="row">
        <div
          v-for="item in userList"
          :key="item.id"
          class="card col-4 mb-4"
          @click="gotoUser(item.id)"
        >
          <div class="card-body">
            <div><b>User :</b> {{ item.firstname }} {{ item.lastname }}</div>
            <div><b>Username :</b> {{ item.username }}</div>
            <div><b>Role :</b> {{ item.role.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import api from "@/api";
import { apiUrl } from "@/settings";
import axios from "axios";

export default {
  data() {
    return {
      userList: "",
      roleLevel: "",
      userId: "",
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    this.userId = this.$store.getters.getUserId;

    axios.get(`${apiUrl}/users`, { withCredentials: true }, {}).then((resp) => {
      console.log(resp.data);
      this.userList = resp.data;
    });
  },
  methods: {
    gotoUser(userSended) {
      console.log(userSended);
      this.$router.push({ name: "account", params: { userIdParam: userSended } });
    },
  },
};
</script>

<style>
.separator {
  margin: 0 10px;
}

.form-group {
  width: 100%;
}
.card {
  cursor: pointer;
}
.card:hover {
  background-color: rgb(231, 231, 231);
}
</style>