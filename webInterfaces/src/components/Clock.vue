<template>
  <div id="conteneur">
    <div id="main">
      <div class="time"><h4>{{ time }}</h4></div>
        <div v-if="!started">
          <div class="btn-container">
            <vs-input state="dark" primary placeholder="Code"/>
            <vs-button flat type="button" class="bouton" @click="Start()" v-if="!started">Start</vs-button>
          </div>   
      </div>
        <div v-if="started">
          <button type="button" class="btn btn-primary btn-lg" disabled>{{formatTime}}</button>
          <div class="btn-container">
            <vs-button flat type="button" class="bouton" @click="Stop()" v-if="clockIn">Stop</vs-button>  
          </div>   
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import moment from 'moment'

export default {
  data() {
    return {
      time:  moment().format('LLLL'),
      userId: "",
      timeState: 'Stopped',
      clockStaus: 'inactive',
      formatTime: '00:00:00',
      startDateTime: "",
      clockIn: false,
      started: false,
      startingTime: 0,                 
      ticker: undefined
    };
  },
   async mounted() {
    this.userId = this.$route.params.userId;
    this.clocks = await api.getUserClocks(this.userId);
  },
  methods: {
    refresh() {
      if(this.timeState == 'Paused')
      {        
        this.clockIn = false;
        this.clockOut= true;
      }
      else if ( this.timeState =='Stopped')
      {
        this.clockIn = false;
        this.clockOut= false;
      }
      else if (this.timeState == 'Running'){          
          this.clockIn = true;
          this.clockOut= false;
      }
    },
    clock() {
      if(this.clockIn)
      {
        this.clockStaus = 'active'
      }
        api.CreateClock(moment().format('MMMM Do YYYY, h:mm:ss a'), this.clockStaus, this.userId);
    },

    //Functions pour le chronomètre!
    Start(){
      if(this.timeState !== 'Running')
      {
        this.started = true;
        this.timeState = 'Running';
        this.refresh();
        this.Tick();
        //on stocke les informations de clock dans la BDD
        this.clock();
      }
    },    
    Stop(){
      window.clearInterval(this.ticker);   
      this.timeState = 'Paused';
      this.refresh();
      this.clock();
      this.Reset();
      this.started = false;   
    },
    Reset(){
      window.clearInterval(this.ticker);
      this.startingTime = 0;
      this.formatTime = '00:00:00';
      this.timeState = 'Stopped';
      this.refresh();
      if(this.timeState == 'Running')
      {
        this.Stop();
      }
    },
    Tick()
    {
      this.ticker = setInterval(()=>{
        this.startingTime++;
        this.formatTime = this.Count(this.startingTime);
      },250)      
    },
    Count(sec)
    {
      let mesuredTime = new Date(null);
      mesuredTime.setSeconds(sec);
      let mesuredHour = mesuredTime.toISOString().substr(11,8);
      return mesuredHour;
    }
    
  },
};
</script>
<style>
#main{
  margin: 15px;
  text-align: center;
}
#conteneur {
    border-radius: 2%;
    width: 30%;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-wrap: wrap;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
.alert {
  background-color: #dce6ff;
}
</style>