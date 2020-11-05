<template>
  <div>
    <h3>Unavailabilities</h3>
    <br />
    <div>
      <button
        class="btn btn-info"
        data-toggle="modal"
        data-target="#modalAddUna"
      >
        Create
      </button>
    </div>
    <br />
    <div class="container">
      <div class="row">
        <div
          v-for="item in unavailabilities"
          :key="item.id"
          class="card col-4 mb-4"
        >
          <div>
            <div class="card-body">
              <div v-if="roleLevel != 3">
                <b>User :</b> {{ item.user.firstname }} {{ item.user.lastname }}
              </div>
              <div><b>From :</b> {{ formatDate(item.start) }}</div>
              <div><b>To :</b> {{ formatDate(item.end) }}</div>
              <div><b>Reason :</b> {{ item.reason }}</div>
              <div
                v-if="item.accepted == 0"
                class="text-danger font-weight-bold"
              >
                <span>Refused</span>
              </div>
              <div
                v-if="item.accepted == 1"
                class="text-success font-weight-bold"
              >
                <span>Accepted</span>
              </div>
              <div
                v-if="item.accepted == null"
                class="text-info font-weight-bold"
              >
                <span>Waiting decision</span>
              </div>
              <div v-if="item.accepted == null">
                <a
                  v-if="roleLevel == 2 || roleLevel == 1"
                  href="#"
                  @click="acceptUna(item.id)"
                  class="card-link btn btn-success"
                  >Accept</a
                >
                <a
                  v-if="roleLevel == 2 || roleLevel == 1"
                  href="#"
                  @click="refuseUna(item.id)"
                  class="card-link btn btn-danger"
                  >Refuse</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalAddUna"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabelAddUna"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabelAddUna">
              Add new unavailability
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
                <label for="from">From :</label>
                <input
                  v-model="dateFrom"
                  type="date"
                  class="form-control"
                  id="from"
                  placeholder="date from"
                />
              </div>
              <div class="form-group">
                <label for="to">To :</label>
                <input
                  v-model="dateTo"
                  type="date"
                  class="form-control"
                  id="to"
                  placeholder="date to"
                />
              </div>
              <div class="form-group">
                <label for="reason">Reason :</label>
                <input
                  v-model="reason"
                  type="text"
                  class="form-control"
                  id="reason"
                  placeholder="Reason"
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
              value="Add"
              @click="AddUnavailability()"
            >
              Add Unavailabilities
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import api from '@/api';
import axios from "axios";
import { apiUrl } from "@/settings";
import moment from "moment";

export default {
  data() {
    return {
      unavailabilities: [],
      roleLevel: "",
      dateFrom: "",
      dateTo: "",
      reason: "",
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    this.refreshData();
  },
  methods: {
    acceptUna(id) {
      axios
        .put(
          `${apiUrl}/unavailabilities/accept/${id}`,
          {},
          {
            withCredentials: true,
          },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
          this.refreshData();
        });
    },
    refuseUna(id) {
      axios
        .put(
          `${apiUrl}/unavailabilities/refuse/${id}`,
          {},
          {
            withCredentials: true,
          },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
          this.refreshData();
        });
    },
    refreshData() {
      axios
        .get(`${apiUrl}/unavailabilities`, { withCredentials: true }, {})
        .then((resp) => {
          console.log(resp.data);
          this.unavailabilities = resp.data;
        });
    },
    formatDate(date) {
      const format1 = "YYYY-MM-DD hh:mm:ss";
      var date1 = new Date(date);

      const dateTime1 = moment(date1).format(format1);
      return dateTime1;
    },
    AddUnavailability() {
      axios
        .post(
          `${apiUrl}/unavailabilities`,

          {
            unavailability: {
              start: this.dateFrom,
              end: this.dateTo,
              reason: this.reason,
            },
          },
          {
            withCredentials: true,
          },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
          this.refreshData();
        });
    },
  },
};
</script>