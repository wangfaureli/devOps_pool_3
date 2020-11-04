<template>
  <div>
    <h3>WorkingTimes</h3>
    <br />
    <div>
      <button
        class="btn btn-info"
        @click="$router.push(`/workingTime/${userId}`)"
      >
        Create
      </button>
    </div>
    <br />
    <div class="container">
      <div class="row">
        <div v-for="item in workingTimes" :key="item.id"  class="card col-4 mb-4 ">
          <div>
            <div class="card-body">
              <div><b>start time :</b> {{ item.start }}</div>
              <div><b>end time :</b> {{ item.end }}</div>

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
        console.log(resp.data);
        this.workingTimes = resp.data;
      });
  },
  methods: {
    async edit(id) {
      this.$router.push(`/workingTime/${this.userId}/${id}`);
    },
  },
};
</script>