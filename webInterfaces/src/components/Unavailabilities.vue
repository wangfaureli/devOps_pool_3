<template>
  <div>
    <h3>Unavailabilities</h3>
    <br />
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      unavailabilities: [],
    };
  },
  async mounted() {
    this.workingTimes = await api.getUnavailabilities();
  },
  methods: {},
};
</script>