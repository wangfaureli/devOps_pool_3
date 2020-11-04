  <template>
  <div>
    <h3>Working Time</h3>
    <br />
    <div v-if="loaded">
      <div><label>Start :</label><input type="date" v-model="start" /></div>
      <div><label>End :</label><input type="date" v-model="end" /></div>
      <div>
        <label>User Id :</label><input type="number" v-model="userSelected" />
      </div>
      <br />
      <button
        v-if="workingTimeId === 0"
        @click="createWorkingTime"
        class="btn btn-success mr-2"
      >
        Create
      </button>
      <button v-else @click="updateWorkingTime" class="btn btn-success mr-2">
        Save
      </button>
      <button
        v-if="workingTimeId !== 0"
        @click="deleteWorkingTime"
        class="btn btn-danger"
      >
        Delete
      </button>
    </div>
    <br />
    <a href="#" @click="$router.push(`/workingTimes/${userId}`)"
      >Back to list</a
    >
  </div>
</template>

<script>
import api from "@/api";
import axios from "axios";
import { apiUrl } from "@/settings";

export default {
  data() {
    return {
      loaded: false,
      workingTimeId: 0,
      start: "",
      end: "",
      userSelected: "",
    };
  },
  async mounted() {
    await this.userId;
    this.workingTimeId = this.$route.params.workingTimeId ?? 0;
    if (this.workingTimeId) {
      const workingTime = await api.getWorkingTime(
        this.workingTimeId,
        this.userId
      );
      this.start = workingTime.start;
      this.end = workingTime.end;
    }
    this.loaded = true;
  },
  methods: {
    async createWorkingTime() {
      console.log(this.userSelected);
      console.log(this.start);
      console.log(this.end);
      axios
        .post(`${apiUrl}/workingtimes/${this.userSelected}`, {
          withCredentials: true,
          workingtime: {
            start: this.start,
            end: this.end,
          },
        })
        .then((resp) => {
          console.log(resp.data);
        });

      this.$router.push(`/workingTimes/`);
    },
    async updateWorkingTime() {
      await api.updateWorkingTime(this.start, this.end, this.workingTimeId);
      this.$router.push(`/workingTimes/${this.userId}`);
    },
    async deleteWorkingTime() {
      try {
        await api.deleteWorkingTime(this.workingTimeId);
        this.$router.push(`/workingTimes/${this.userId}`);
      } catch (error) {
        console.error(error);
        alert("Error during suppression");
      }
    },
  },
};
</script>