<template>
  <div v-if="loading">
    Chargement...
  </div>
  <app v-else>
    <vs-nav>
      <Navbar />
    </vs-nav>
    <vs-main> </vs-main>
  </app>
</template>


<script>
import Navbar from "./components/Nav";
export default {
  components: {
    Navbar,
  },
  methods: {
    
  },
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
