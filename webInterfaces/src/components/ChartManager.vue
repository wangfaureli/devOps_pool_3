<template>
  <div>
    <h3>Chart Manager</h3>
    <br />

    <donut-chart
      id="donut"
      :data="donutData"
      colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
      resize="true"
    >
    </donut-chart>

    <br /><br />

    <bar-chart
      id="bar"
      :data="barData"
      xkey="year"
      ykeys='[ "and", "ios", "win" ]'
      labels='[ "Android", "iOS", "Windows" ]'
      bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
      grid="true"
      grid-text-weight="bold"
      resize="true"
    >
    </bar-chart>

    <br /><br />

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
      resize="true"
    >
    </area-chart>
  </div>
</template>

<script>
import { apiUrl } from "@/settings";
import axios from "axios";
import Raphael from "raphael/raphael";
global.Raphael = Raphael;
import { DonutChart, BarChart, AreaChart } from "vue-morris";
// import api from '@/api';

export default {
  data() {
    return {
      userId: "",
      donutData: [],
      barData: [],
      areaData: [],
      workingTimes: [],
      unavailabilities: [],
      clocks: [],
    };
  },
  components: { DonutChart, BarChart, AreaChart },
  async mounted() {
    this.userId = this.$route.params.userId;
    this.donutData = [
      { label: "Download Sales", value: 12 },
      { label: "In-Store Sales", value: 30 },
      { label: "Mail-Order Sales", value: 20 },
    ];
    this.barData = [
      { year: "2013", and: 10, ios: 5, win: 2 },
      { year: "2014", and: 10, ios: 15, win: 3 },
      { year: "2015", and: 20, ios: 25, win: 2 },
      { year: "2016", and: 30, ios: 20, win: 1 },
    ];
    this.areaData = [
      { year: "2013", a: 30, b: 5 },
      { year: "2014", a: 35, b: 15 },
      { year: "2015", a: 29, b: 25 },
      { year: "2016", a: 50, b: 20 },
    ];
    this.workingTimes = [
      { year: "2013", a: 30, b: 5 },
      { year: "2014", a: 35, b: 15 },
      { year: "2015", a: 29, b: 25 },
      { year: "2016", a: 50, b: 20 },
    ];
  },
  created: function () {
    if (this.$route.params.userid != null) {
      this.userId = this.$route.params.userid;
    }
    axios
      .get(`${apiUrl}/workingtimes`, { withCredentials: true }, {})
      .then((resp) => {
        console.log(resp.data);
        this.workingTimes = resp.data;
      });
    axios
      .get(`${apiUrl}/unavailabilities`, { withCredentials: true }, {})
      .then((resp) => {
        console.log(resp.data);
        this.unavailabilities = resp.data;
      });
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