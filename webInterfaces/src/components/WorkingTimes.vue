<template>
  <div>
    <h3>WorkingTimes</h3>
    <br />
    <div>
      <button class="btn btn-info" @click="$router.push(`/workingTime/${userId}`)">Create</button>
    </div>
    <br />
    <div v-for="(item) in workingTimes" :key="item.id">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <div><b>start time :</b> {{ item.start }}</div>
          <div><b>end time :</b> {{ item.end }}</div>
          <a href="#" @click="edit(item.id)" class="card-link text-info">Edit</a>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      workingTimes: []
      
    };
  },
  async mounted() {
    this.workingTimes = await api.getWorkingTimes();
     
  },
  methods: {
    async edit(id) {
        this.$router.push(`/workingTime/${this.userId}/${id}`)
    },
    // async deleteWorkingTime(id) {
    //   try {
    //     await api.deleteWorkingTime(id);
    //     let tmp = [];
    //     this.workingTimes.forEach(element => {
    //       if (element.id !== id) {
    //         tmp.push(element);
    //       }
    //     });
    //     this.workingTimes = tmp;
    //   }
    //   catch (error) {
    //     console.error(error);
    //     alert("Error during suppression");
    //   }
    // }
  }
};
</script>