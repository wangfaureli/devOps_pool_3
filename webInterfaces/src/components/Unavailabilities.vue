<template>
  <div>
    <h3>Unavailabilities</h3>
    <br />
    <div>
      <button
        class="btn btn-info"
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
              <div><b>User :</b> {{ item.user.firstname }} {{ item.user.lastname }}</div>
              <div><b>From :</b> {{ formatDate(item.start) }}</div>
              <div><b>To :</b> {{ formatDate(item.end) }}</div>
              <div><b>Reason :</b> {{ item.reason }}</div>
              <div>
                <b>Accepted :</b>
                <span v-if="item.accepted == 0">Refused</span>
                <span v-else-if="item.accepted == 1">Accepted</span>
                <span v-else>Not yet answered</span>
              </div>

              <a
                v-if="roleLevel == 2 || roleLevel == 1"
                href="#"
                @click="edit(item.id)"
                class="card-link text-info"
                >Edit</a
              >
            </div>
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
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    axios
      .get(`${apiUrl}/unavailabilities`, { withCredentials: true }, {})
      .then((resp) => {
        console.log(resp.data);
        this.unavailabilities = resp.data;
      });
  },
  methods: {
        formatDate(date) {
      const format1 = "D MMMM YYYY à h:mm:ss";
      var date1 = new Date(date);

      const dateTime1 = moment(date1).locale('fr').format(format1);
      return dateTime1;
    },
  },
};
</script>