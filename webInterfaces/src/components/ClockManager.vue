<template>
  <div class="jumbotron jumbotron-fluid" id="main">
    <h1>ClockManager!</h1>
    <h6>
    </h6>

    <div class="alert alert-danger" role="alert" v-if="clockIn">
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
        v-if="!clockIn"
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
      timeState: "Stopped",
      clockStaus: "inactive",
      formatTime: "00:00:00",
      startDateTime: "",
      clockIn: false,
      startingTime: 0,
      ticker: undefined,
    };
  },
  async mounted() {
    this.roleLevel = this.$store.getters.getRoleLevel;
    this.userId = this.$store.getters.getUserId;
  },
  methods: {
    refresh() {
      if (this.timeState == "Paused" || this.timeState == "Stopped") {
        this.clockIn = false;
      } else if (this.timeState == "Running") {
        this.clockIn = true;
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
        this.timeState = "Running";
        this.refresh();
        this.Tick();
        //on stocke les informations de clock dans la BDD
        this.clock();

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
      this.refresh();
      this.clock();

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
      if (this.timeState == "Running") {
        this.Stop();
      }
    },
    Tick() {
      this.ticker = setInterval(() => {
        this.startingTime++;
        this.formatTime = this.Count(this.startingTime);
      }, 250);
    },
    Count(sec) {
      let mesuredTime = new Date(null);
      mesuredTime.setSeconds(sec);
      let mesuredHour = mesuredTime.toISOString().substr(11, 8);
      return mesuredHour;
    },
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