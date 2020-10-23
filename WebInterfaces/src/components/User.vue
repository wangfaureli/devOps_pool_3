<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex flex-column">
      <p class="" v-if="userId == ''">
        Si la liste est vide et que vous être sur un menu, veuillez raffraichir
        la page
      </p>

      <div class="d-flex">
        <select v-model="userSelected" class="w-100 mr-5">
          <option
            v-for="userItem in users"
            :key="userItem.id"
            :value="userItem.id"
          >
            {{ userItem.username }}
          </option>
        </select>

        <input
          type="submit"
          class="btn btn-primary"
          value="Changer d'utilisateur"
          @click="getUserPage(userSelected)"
        />
      </div>
    </div>
    <hr class="mt-5" />
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex mt-3 mb-3">
        <span class="navbar-text">
          {{ user.id }}
        </span>
        <span class="navbar-text separator"> - </span>
        <span class="navbar-text">{{ user.username }} </span>
        <span class="navbar-text separator"> - </span>
        <span class="navbar-text">
          {{ user.email }}
        </span>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-success"
          data-toggle="modal"
          data-target="#modalAddUser"
        >
          Ajouter un utilisateur
        </button>
        <button
          class="btn btn-warning mr-5 ml-5"
          data-toggle="modal"
          data-target="#modalEditUser"
        >
          Modifier l'utilisateur
        </button>
        <button
          class="btn btn-danger"
          data-toggle="modal"
          data-target="#modalDeleteUser"
        >
          Supprimer l'utilisateur
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
      <div class="modal-dialog" role="document">
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
                  placeholder="Username de l'utilisateur"
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
      </div>
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
            <h5 class="modal-title" id="modalLabelEditUser">
              Modification de l'utilisateur
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
                <label for="editUsername">Username :</label>
                <input
                  :value="user.username"
                  type="text"
                  class="form-control"
                  id="editUsername"
                  placeholder="Username de l'utilisateur"
                />
              </div>
              <div class="form-group">
                <label for="editUserEmail">Email :</label>
                <input
                  :value="user.email"
                  type="email"
                  class="form-control"
                  id="editUserEmail"
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
              class="btn btn-warning"
              type="submit"
              value="Modifier l'utilisateur"
              @click="updateUser()"
            >
              Modifier l'utilisateur
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
              Suppression de l'utilisateur en cours
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
            <p class="">
              Voulez-vous vraiment supprimer l'utilisateur en cours ?
            </p>
            <p>{{ user.username }} - {{ user.email }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">
              Annuler
            </button>
            <button
              class="btn btn-danger"
              type="submit"
              value="Supprimer l'utilisateur"
              @click="deleteUser()"
            >
              Supprimer l'utilisateur
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      user: "",
      users: "",
      userSelected: "",
      newUsername: "",
      newUserEmail: "",
    };
  },
  async mounted() {
    await this.userId;
    this.user = await api.getUser(this.userId);
    this.users = await api.getUsers();
    this.userSelected = this.user;
  },
  methods: {
    createUser() {
      api.createUser(this.newUsername, this.newUserEmail);
      this.newUsername = "";
      this.newUserEmail = "";
    },

    updateUser() {},
    getUser() {},
    deleteUser() {
      api.deleteUser(this.userId);
    },
    getUserPage(user) {
      let currentRoute = this.$route.matched[0].path;
      let currentRegex = /:userId/gi;

      let gotoRoute = currentRoute.replace(currentRegex, user);
      this.$router.push(gotoRoute);
      this.$router.go();
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