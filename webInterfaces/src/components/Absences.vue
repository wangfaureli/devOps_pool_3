<template>
  <div class="center">
    <vs-table v-model="selected">
      <template #thead>
        <vs-tr>
          <vs-th
            sort
            @click="absences = $vs.sortData($event, absences, 'started')"
          >
            Start Date
          </vs-th>
          <vs-th
            sort
            @click="absences = $vs.sortData($event, absences, 'ended')"
          >
            End Date
          </vs-th>
          <vs-th
            sort
            @click="absences = $vs.sortData($event, absences, 'type')"
          >
            Type
          </vs-th>
          <vs-th
            sort
            @click="absences = $vs.sortData($event, absences, 'status')"
          >
            Status
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(absence, i) in absences"
          :data="absence"
          :is-selected="selected == absence"
        >
          <vs-td>
            {{ absence.started }}
          </vs-td>
          <vs-td>
            {{ absence.ended }}
          </vs-td>
          <vs-td>
            {{ absence.type }}
          </vs-td>
          <vs-td>
            {{ absence.status }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    {{ responseMessage }}

    <!-- Btn Ajout des abscences -->
    <div id="add" v-if="!addAbs">
      <div id="bouton">
        <vs-button circle @click="addAbs = !addAbs">
          <b>Add Absence</b>
        </vs-button>
      </div>
    </div>

    <!-- PopUp ajout -->
    <div id="conteneur" v-if="addAbs">
      <div class="center content-inputs">
        <h5>Add absence</h5>
        <vs-input state="dark" primary type="date" v-model="promptStarted" />
        <vs-input state="dark" primary type="date" v-model="promptEnded" />
        <vs-select placeholder="Select Type" v-model="promptType">
          <vs-option label="CP" value="CP"> CP </vs-option>
          <vs-option label="RTT" value="RTT"> RTT </vs-option>
          <vs-option label="ITT" value="ITT"> ITT </vs-option>
          <vs-option label="CM" value="CM"> CM </vs-option>
        </vs-select>
        <div id="bouton">
          <vs-button circle @click="addAbsence">
            <b>Confirm</b>
          </vs-button>
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import { apiUrl } from "@/settings";
export default {
  data: () => ({
    time: moment().format("YYYY-MM-DD"),
    selected: null,
    absences: [],
    currentuserId: "",
    addAbs: false,
    responseMessage: "",
    message: "",
    promptStarted: "",
    promptEnded: "",
    promptType: "",
  }),
  methods: {
    mounted(){
      //Get currentUser
    },
    async addAbsence() {
      if (
        this.promptStarted == "" ||
        this.promptEnded == "" ||
        this.promptType == ""
      ) {
        this.message = "You must fill all fields.";
        return;
      }
      let state = "";
      if (this.promptStarted > this.time) {
        state = "Incoming";
      } else if (
        this.promptStarted < this.time &&
        this.promptEnded > this.time
      ) {
        state = "In progress";
      } else if (this.promptEnded < this.time) {
        state = "Past";
      }
      this.absences.push({
        started: this.promptStarted,
        ended: this.promptEnded,
        type: this.promptType,
        status: state,
      });

      let response = await axios.post(`${apiUrl}/unavailability/${this.currentuserId}`, {
        unavailability: {
          start: this.promptStarted,
          end: this.promptEnded,
          reason: this.promptType,
        },
      });
      this.reponseMessage = response.message;

      //reset values
      this.promptStarted = "";
      this.promptEnded = "";
      this.promptType = "";
      this.addAbs = !this.addAbs;
    },
  },
};
</script>
<style>
.center {
  margin-top: 10%;
  margin-right: 20%;
  margin-left: 20%;
}
.vs-input-content {
  height: 50px;
}
#searchbar {
  width: 100%;
  height: 100%;
}
#bouton {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
#conteneur {
  border-radius: 2%;
  width: 30%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#add {
  border-radius: 2%;
  width: 30%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}
</style>     