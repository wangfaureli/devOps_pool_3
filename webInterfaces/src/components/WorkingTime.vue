<template>
  <div>
    <h3>Working Time</h3>
    <br />
    <div v-if="loaded">
      <div><label>Start time:</label><input v-model="start" /></div>
      <div><label>End time:</label><input v-model="end" /></div>
      <br />
      <button v-if="workingTimeId === 0" @click="createWorkingTime" class="btn btn-success mr-2">Create</button>
      <button v-else @click="updateWorkingTime" class="btn btn-success mr-2">Save</button>
      <button v-if="workingTimeId !== 0" @click="deleteWorkingTime" class="btn btn-danger">Delete</button>
    </div>
    <br />
    <a href="#" @click="$router.push(`/workingTimes/${userId}`)">Back to list</a>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      loaded: false,
      workingTimeId: 0,
      start: '',
      end: ''
    };
  },
  async mounted() {
    await this.userId;
    this.workingTimeId = this.$route.params.workingTimeId ?? 0;
    if (this.workingTimeId) {
      const workingTime = await api.getWorkingTime(this.workingTimeId, this.userId);
      this.start = workingTime.start;
      this.end = workingTime.end;
    }
    this.loaded = true;
  },
  methods: {
    async createWorkingTime() {
      await api.createWorkingTime(this.start, this.end, this.userId);
      this.$router.push(`/workingTimes/${this.userId}`);
    },
    async updateWorkingTime() {
      await api.updateWorkingTime(this.start, this.end, this.workingTimeId);
      this.$router.push(`/workingTimes/${this.userId}`);
    },
    async deleteWorkingTime() {
      try {
        await api.deleteWorkingTime(this.workingTimeId);
        this.$router.push(`/workingTimes/${this.userId}`);
      }
      catch (error) {
        console.error(error);
        alert("Error during suppression");
      }
    },
  },
};
</script>