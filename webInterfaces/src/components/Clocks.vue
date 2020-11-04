<template>
  <div>
    <h3>Clocks</h3>
    <br />
    <div>
      <button class="btn btn-info" @click="$router.push('/clock-manager')">
        Create
      </button>
    </div>
    <br />
    <div class="container">
      <div class="row justify-content-around">
        <div v-for="item in clocks" :key="item.id" class="card col-5 mb-2">
          <div>
            <div class="card-body">
              <div>
                <div v-if="item.status == 1">
                  Created at : {{ formatDate(item.createdAt) }}
                </div>
                <div v-else-if="item.status == 0">
                  Finished at : {{ formatDate(item.createdAt) }}
                </div>
              </div>
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
      clocks: [],
      roleLevel: "",
      userId: "",
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    this.userId = this.$store.getters.getUserId;

    axios
      .get(
        `${apiUrl}/clocks/${this.$store.getters.getUserId}`,
        { withCredentials: true },
        {}
      )
      .then((resp) => {
        console.log(resp.data);
        this.clocks = resp.data;
      });
  },
  methods: {
    formatDate(date) {
      const format1 = "YYYY-MM-DD hh:mm:ss";
      var date1 = new Date(date);

      const dateTime1 = moment(date1).format(format1);
      return dateTime1;
    },
  },
};
</script>