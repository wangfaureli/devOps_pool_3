<template>
  <div class="container mt-5 mb-5">
    <hr class="mt-5" />
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column mt-3 mb-3">
        <div class="d-flex">
          <label style="width: 200px">Username : </label>
          <p>{{ user.username }}</p>
        </div>
        <div class="d-flex">
          <label style="width: 200px">First name : </label>
          <p>{{ user.firstname }}</p>
        </div>
        <div class="d-flex">
          <label style="width: 200px">Last name : </label>
          <p>{{ user.lastname }}</p>
        </div>
        <div class="d-flex">
          <label style="width: 200px">Email : </label>
          <p>{{ user.email }}</p>
        </div>
        <div class="d-flex">
          <label style="width: 200px">Role : </label>
          <p>{{ user.role.name }}</p>
        </div>
        <div class="d-flex">
          <label style="width: 200px">Birthday : </label>
          <p>{{ formatDate(user.birthday) }}</p>
        </div>
        <div class="d-flex">
          <label style="width: 200px">Equipes : </label>
          <div class="d-flex flex-column">
            <p v-for="(item, key) in user.teams" :key="key">
              - {{ item.name }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <button
          class="btn btn-warning mr-5 ml-5"
          data-toggle="modal"
          data-target="#modalEditUser"
        >
          Edit Profile
        </button>
        <button
          class="btn btn-info mr-5 ml-5"
          data-toggle="modal"
          data-target="#modalEditPassword"
        >
          Edit Password
        </button>
        <button
          class="btn btn-danger"
          data-toggle="modal"
          data-target="#modalDeleteUser"
        >
          Delete Profile
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalAddUser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabelAddUser"
      aria-hidden="true"
    >
      <!-- <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabelAddUser">
              Ajout d'un utilisateur
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <form class="form-group">
              <div class="form-group">
                <label for="newUsername">Username :</label>
                <input
                  v-model="newUsername"
                  type="text"
                  class="form-control"
                  id="newUsername"
                  placeholder="Your Username"
                />
              </div>
              <div class="form-group">
                <label for="newUserFirstname">FirstName :</label>
                <input
                  v-model="newUserFirstname"
                  type="text"
                  class="form-control"
                  id="newUserFirstname"
                  placeholder="Your firstname"
                />
              </div>

              <div class="form-group">
                <label for="newUserLastname">Lastname :</label>
                <input
                  v-model="newUserLastname"
                  type="text"
                  class="form-control"
                  id="newUserLastname"
                  placeholder="Your lastname"
                />
              </div>
              <div class="form-group">
                <label for="newUserEmail">Email :</label>
                <input
                  v-model="newUserEmail"
                  type="email"
                  class="form-control"
                  id="newUserEmail"
                  placeholder="Email de l'utilisateur"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">
              Annuler
            </button>
            <button
              class="btn btn-success"
              type="submit"
              value="Ajouter l'utilisateur"
              @click="createUser()"
            >
              Ajouter l'utilisateur
            </button>
          </div>
        </div>
      </div> -->
    </div>

    <div
      class="modal fade"
      id="modalEditUser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabelEditUser"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabelEditUser">Edit profile</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <form class="form-group">
              <div class="form-group">
                <label for="editUsername">Username :</label>
                <input
                  v-model="user.username"
                  type="text"
                  class="form-control"
                  id="editUsername"
                  placeholder="Your Username"
                />
              </div>
              <div class="form-group">
                <label for="editFirstname">Firstname :</label>
                <input
                  v-model="user.firstname"
                  type="text"
                  class="form-control"
                  id="editFirstname"
                  placeholder="Your Firstname"
                />
              </div>
              <div class="form-group">
                <label for="editLastname">Lastname :</label>
                <input
                  v-model="user.lastname"
                  type="text"
                  class="form-control"
                  id="editLastname"
                  placeholder="Your Lastname"
                />
              </div>
              <div class="form-group">
                <label for="editBirthday">Birthday :</label>
                <input
                  :value="formatDate(user.birthday)"
                  type="text"
                  class="form-control"
                  id="editBirthday"
                  placeholder="Your Birthday"
                />
              </div>

              <div class="form-group">
                <label for="editUserEmail">Email :</label>
                <input
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  id="editUserEmail"
                  placeholder="Your Email"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">
              Cancel
            </button>
            <button
              class="btn btn-warning"
              type="submit"
              aria-label="Close"
              data-dismiss="modal"
              value="Edit Profile"
              @click="updateUser()"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalEditPassword"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabelEditUser"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabelEditUserPassword">
              Edit password
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <form class="form-group">
              <div class="form-group">
                <label for="editUserPassword">Password :</label>
                <input
                  type="password"
                  class="form-control"
                  id="editUserPassword"
                  placeholder="New Password"
                />
              </div>
              <div class="form-group">
                <label for="editUserPasswordRepeat">Repeat password :</label>
                <input
                  type="password"
                  class="form-control"
                  id="editUserPasswordRepeat"
                  placeholder="Repeat New Password"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">
              Cancel
            </button>
            <button
              class="btn btn-info"
              type="submit"
              aria-label="Close"
              data-dismiss="modal"
              value="Edit Password"
              @click="updatePassword()"
            >
              Edit Password
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalDeleteUser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabelRemoveUser"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabelRemoveUser">
              Removing your profile in progress
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex flex-column align-items-center">
            <p class="">Do you really want to delete your profile?</p>
            <p>{{ user.username }} - {{ user.email }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">
              Cancel
            </button>
            <button
              class="btn btn-danger"
              type="submit"
              value="Remove your profile"
              @click="deleteUser()"
            >
              Remove your profile
            </button>
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
import moment from "moment";
import bcrypt from "bcryptjs";

export default {
  data() {
    return {
      user: "",
      userSelected: "",
      newUsername: "",
      newUserEmail: "",
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    const userId = this.$store.getters.getUserId;
    this.userId = userId;

    let userIdParam = this.$route.params.userIdParam;

    if (userIdParam) {
      if (this.roleLevel != 3) {
        this.userSelected = userIdParam;
        this.getUser(userIdParam);
      } else {
        this.userSelected = userId;
        this.getUser(this.userId);
      }
    } else {
      this.userSelected = userId;
      this.getUser(this.userId);
    }
  },
  methods: {
    updateUser() {
      let bithD = document.querySelector("#editBirthday");
      bithD = bithD.value;
      this.user.birthday = bithD;

      axios
        .put(
          `${apiUrl}/users/${this.userSelected}`,

          { user: this.user },
          {
            withCredentials: true,
          },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
          this.$router.push("dashboard");
        });
    },
    updatePassword() {
      let newPass = document.querySelector("#editUserPassword");
      let newPassRepeat = document.querySelector("#editUserPasswordRepeat");

      newPass = newPass.value;
      newPassRepeat = newPassRepeat.value;

      if (newPass == newPassRepeat) {
        bcrypt.hash(newPassRepeat, 6).then((hash) => {
          this.user.password = hash;
          console.log(this.user.password);

          axios
            .put(
              `${apiUrl}/users/${this.userSelected}`,

              { user: this.user },
              {
                withCredentials: true,
              },
              {}
            )
            .then((resp) => {
              console.log(resp.data);
              this.$router.push("dashboard");
            });
        });
      }
    },
    getUser(userIdParam) {
      console.log(userIdParam);
      axios
        .get(`${apiUrl}/users/${userIdParam}`, { withCredentials: true }, {})
        .then((resp) => {
          console.log(resp.data);
          this.user = resp.data;
        });
    },
    deleteUser() {
      axios
        .delete(
          `${apiUrl}/users/${this.userSelected}`,
          { withCredentials: true },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
          this.$router.push("dashboard");
        });
    },
    getUserPage(user) {
      let currentRoute = this.$route.matched[0].path;
      let currentRegex = /:userId/gi;

      let gotoRoute = currentRoute.replace(currentRegex, user);
      this.$router.push(gotoRoute);
      this.$router.go();
    },
    formatDate(date) {
      const format1 = "YYYY-MM-DD hh:mm:ss";
      var date1 = new Date(date);

      const dateTime1 = moment(date1).format(format1);
      return dateTime1;
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
</style>