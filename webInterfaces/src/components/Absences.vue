<template>
    <div class="center">
      <vs-table
        v-model="selected"
        >
        <template #header>
          <vs-input id="searchbar" v-model="search" border placeholder="Search" />
        </template>
        <template #thead>
          <vs-tr>
            <vs-th>
              <vs-checkbox
                :indeterminate="selected.length == absences.length" v-model="allCheck"
                @change="selected = $vs.checkAll(selected, absences)"
              />
            </vs-th>
            <vs-th sort @click="absences = $vs.sortData($event ,absences, 'startDate')">
              Start Date
            </vs-th>
            <vs-th sort @click="absences = $vs.sortData($event ,absences, 'endDate')">
              End Date
            </vs-th>
            <vs-th sort @click="absences = $vs.sortData($event ,absences, 'type')">
              Type
            </vs-th>
            <vs-th sort @click="absences = $vs.sortData($event ,absences, 'status')">
              Status
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage($vs.getSearch(absences, search), page, max)"
            :data="tr"
            :is-selected="!!selected.includes(tr)"
            not-click-selected
            open-expand-only-td
          >
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="selected" />
            </vs-td>
            <vs-td>
            {{ tr.startDate }}
            </vs-td>
            <vs-td>
            {{ tr.endDate }}
            </vs-td>
            <vs-td>
            {{ tr.type }}
            </vs-td>
            <vs-td>
            {{ tr.status }}
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(absences, search), max)" />
        </template>
      </vs-table>
      <div id="conteneur">
          <div class="center content-inputs">
            <h5> Add absence</h5>
            <vs-input
            state="dark"
            primary
            type="date"
            v-model="value1"
            />
            <vs-input
            state="dark"
            primary
            type="date"
            v-model="value2"
            />
            <vs-select
              placeholder="Select Type"
              v-model="value3"
            >
        <vs-option label="CP" value="1">
          CP
        </vs-option>
        <vs-option label="RTT" value="2">
          RTT
        </vs-option>
        <vs-option label="ITT" value="3">
          ITT
        </vs-option>
        <vs-option label="CM" value="4">
          CM
        </vs-option>
      </vs-select>
            <div id="bouton">
                <vs-button
                    circle
                    :active="active == 0"
                    @click="active = 0"
                >
                    <b>Confirm</b>
                </vs-button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data:() => ({
        value1: '',
        value2: '',
        value3: '',
        editActive: false,
        edit: null,
        editProp: {},
        search: '',
        allCheck: false,
        page: 1,
        max: 5,
        active: 0,
        selected: [],
        absences: [
          {
            "startDate": "12/10/2020",
            "endDate": "25/10/2020",
            "type": "RTT",
            "status": "Past",
          },
          {
            "startDate": "1/11/2020",
            "endDate": "12/11/2020",
            "type": "RTT",
            "status": "Incoming",
          }
        ]
      })
    }
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
#searchbar{
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
</style>    