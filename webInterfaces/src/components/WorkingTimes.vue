<template>
  <div>
    <h3>WorkingTimes</h3>
    <br />
    <div>
      <button
        v-if="this.$store.getters.getRoleLevel != 3"
        class="btn btn-info"
        @click="$router.push(`/workingtimes/add`)"
      >
        Create
      </button>
    </div>
    <br />
    <div class="container">
      <div class="row">
        <div
          v-for="item in workingTimes"
          :key="item.id"
          class="card col-4 mb-4"
        >
          <div>
            <div class="card-body">
              <div v-if="item.user != null">
                <b>UserId : </b>{{ item.user.firstname }}
                {{ item.user.lastname }}
              </div>
              <div><b>Start : </b> {{ formatDate(item.start) }}</div>
              <div><b>End : </b> {{ formatDate(item.end) }}</div>

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
      workingTimes: [],
      roleLevel: "",
    };
  },
  async mounted() {
    // this.workingTimes = await api.getWorkingTimes();
    this.roleLevel = this.$store.getters.getRoleLevel;
    console.log(this.$store.getters.getRoleLevel);
    axios
      .get(`${apiUrl}/workingtimes`, { withCredentials: true }, {})
      .then((resp) => {
        let newArray = resp.data;

        newArray.forEach(el => {

          if (el.user == null) {
              newArray.splice(el, 1);
          }
        });
          
        this.workingTimes = newArray;
      });
  },
  methods: {
    async edit(id) {
      this.$router.push(`/workingTime/${this.userId}/${id}`);
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