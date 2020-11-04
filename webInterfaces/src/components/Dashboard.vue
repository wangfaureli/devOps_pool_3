<template>
  <div>
    <h3>Dashboard</h3>
    <br>
    <h6> UserID envoyé en paramètre : <b>{{ userId }}</b></h6>
    <div v-for="(item, key) in workingTimes" :key="key">
      <br>
    </div>

    <donut-chart 
      id="donut" 
      :data="donutData" 
      colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]' 
      resize="true">
    </donut-chart> 

    <br><br>
    
    <bar-chart
      id="bar"
      :data="barData"
      xkey="year"
      ykeys='[ "and", "ios", "win" ]'
      labels='[ "Android", "iOS", "Windows" ]'
      bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
      grid="true"
      grid-text-weight="bold"
      resize="true">
    </bar-chart> 

    <br><br>

    <area-chart
      id="area"
      :data="areaData"
      xkey="year"
      ykeys='[ "a", "b"]'
      labels='[ "a", "b" ]' 
      line-colors='[ "#36A2EB", "#FFCE56" ]'
      grid="true"
      grid-text-weight="bold"
      behaveLikeLine="true"
      parseTime="false"
      resize="true">
    </area-chart>
  </div>
</template>

<script>
import axios from "axios";
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
import { DonutChart, BarChart, AreaChart } from 'vue-morris'
import api from '@/api';

export default {
  data() {
    return {
      userId: "",
      donutData: [],
      barData: [],
      areaData: []
    };
  },
  components:{DonutChart, BarChart, AreaChart},
  async mounted() {
    this.userId = this.$route.params.userId;
    this.donutData = [
      { label: 'Red', value: 30 },
      { label: 'Blue', value: 50 },
      { label: 'Yellow', value: 100 }
    ]
    this.barData = [
      { "year": "2013", "and": 10, "ios": 5, "win": 2 },
      { "year": "2014", "and": 10, "ios": 15, "win": 3 },
      { "year": "2015", "and": 20, "ios": 25, "win": 2 },
      { "year": "2016", "and": 30, "ios": 20, "win": 1 },
    ]
    this.areaData = [
      { "year": "2013", "a": 30, "b": 5 },
      { "year": "2014", "a": 35, "b": 15 },
      { "year": "2015", "a": 29, "b": 25 },
      { "year": "2016", "a": 50, "b": 20 },
    ]
    this.workingTimes = await api.getWorkingTimes(this.userId);
  },
  created: function () {
    if (this.$route.params.userid != null) {
      this.userId = this.$route.params.userid;
    }
  },
  methods: {
    customMethod() {
      axios
        .get(URL)
        .then((response) => {
          this.param = response.data.param;
        })
        .catch(() => {});
    },
  },
};
</script>