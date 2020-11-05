<template>
  <div class="jumbotron jumbotron-fluid" id="main">
    <h1>ClockManager!</h1>
    <h6>
    </h6>

    <div class="alert alert-danger" role="alert" v-if="this.$store.getters.getClockedIn">
      Work is in progress
    </div>
    <div class="alert alert-success" role="alert" v-else>
      Work is completed
    </div>

    <div class="time">
      <h4>{{ time }}</h4>
    </div>
    <button type="button" class="btn btn-primary btn-lg">
      {{ formatTime }}
    </button>

    <div class="btn-container">
      <button
        type="button"
        class="btn btn-success"
        @click="Start()"
        v-if="clockIn == false"
      >
        Start
      </button>
      <button type="button" class="btn btn-danger" @click="Stop()" v-else>
        Stop
      </button>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import api from "@/api";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "@/settings";

export default {
  data() {
    return {
      time: moment().format("LLLL"),
      userId: "",
      timeState: this.$store.getters.getClockState,
      clockStaus: "inactive",
      formatTime: this.$store.getters.getClockTime,
      startDateTime: "",
      clockIn: this.$store.getters.getClockedIn,
      startingTime: this.$store.getters.getClockStartingTime,
      ticker: undefined,
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    this.userId = this.$store.getters.getUserId;
    if(this.clockIn == true)
      {
        this.startingTime = this.$store.getters.getClockStartingTime
        this.Tick()
      }
  },
  methods: {
    refresh() {
      if (this.timeState == "Stopped") {
        this.clockIn = false;
        this.$store.commit('setClockedIn', this.clockIn)
        
      } else if (this.timeState == "Running") {
        this.clockIn = true;
        this.$store.commit('setClockedIn', this.clockIn)
      }
    },
    clock() {
      if (this.clockIn) {
        this.clockStaus = "active";
      }
      api.CreateClock(
        moment().format("YYYY-MM-DD hh:mm:ss"),

        this.clockStaus,
        this.userId
      );
    },

    //Functions pour le chronomètre!
    Start() {      
      if (this.timeState !== "Running") {
        //this.Reset();
        this.timeState = "Running";
        this.$store.commit('setClockState', this.timeState)
        this.refresh();
        this.Tick();
        //on stocke les informations de clock dans la BDD
        //this.clock();

         axios
        .post(
          `${apiUrl}/clocks/${this.$store.getters.getUserId}`,
          {},
          {
            withCredentials: true,
          },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
        });
      }
    },
    Stop() {
      window.clearInterval(this.ticker);
      this.timeState = "Stopped";
      this.$store.commit('setClockState', this.timeState)
      console.log("stopped time :" + this.formatTime)
      this.$store.commit('setClockTime', this.formatTime)
      this.refresh();
      //this.clock();

      axios
        .post(
          `${apiUrl}/clocks/${this.$store.getters.getUserId}`,
          {},
          {
            withCredentials: true,
          },
          {}
        )
        .then((resp) => {
          console.log(resp.data);
        });
    },
    Reset() {
      window.clearInterval(this.ticker);
      this.startingTime = 0;
      this.formatTime = "00:00:00";
      this.refresh;      
    },
    Tick() {
      this.ticker = setInterval(() => {
        this.startingTime++;
        this.formatTime = this.Count(this.startingTime);
      }, 650);
      console.log("here :" + this.startingTime)
      this.$store.commit('setClockStartingTime', this.startingTime)
      this.$store.commit('setClockTime', this.formatTime)
      
    },
    Count(sec) {
      let mesuredTime = new Date(null);
      mesuredTime.setSeconds(sec);
      let mesuredHour = mesuredTime.toISOString().substr(11, 8);      
      return mesuredHour;
    },
  },
  beforeMount(){
      console.log("mount starts")
      this.timeState = this.$store.getters.getClockState,      
      this.formatTime = this.$store.getters.getClockTime,      
      this.clockIn = this.$store.getters.getClockedIn,
      this.startingTime = this.$store.getters.getClockStartingTime
      console.log(this.startingTime)
      
 },
};
</script>
<style>
#main {
  margin: 15px;
  text-align: center;
}
#date {
  text-decoration: brown;
}
.btn {
  margin: 10px;
}
</style>