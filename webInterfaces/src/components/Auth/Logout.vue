<template>
  <div></div>
</template>

<script>
import api from "@/api";

export default {
  name: "signOut",
  async mounted() {
    this.workingTimes = await api.signOut();
  },
};
</script>