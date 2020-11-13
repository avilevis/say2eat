<template>
  <div class="container ">
    <weekdays-picker
        v-for="weekday in weekdays_picker_array"
        :key="weekday.id"
        :id="weekday.id"
        :days="weekday.days"
        :times="weekday.times"
        @updateWeekdays="updateWeekdays"
        @updateTime="updateTimes"
        @deleteComponent="deleteComponent"
    ></weekdays-picker>
    <div class="add-btn row my-5">
      <button type="button" class="btn btn-outline-info col" @click="addWeekDaysPicker">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.getWeekdays()
  },
  data() {
    return {
      empty_weekdays_picker:{
        id: null,
        days: {
          Sunday: false,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
        },
        times:{
          open: null,
          close: null,
          allDay: false,
        }
      },
      weekdays_picker_array: [],
    }
  },
  components: {},
  methods: {
    addWeekDaysPicker(){
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(this.empty_weekdays_picker)
      }
      let self = this
      fetch("http://127.0.0.1:3000/api", requestOptions)
          .then(response => response.json())
          .then(data => {
            self.weekdays_picker_array.push(data)
          })
          .catch((err)=>console.log(err))
    },
    patchWeekdays(id, field, value){
      let requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: id,
          field: field,
          value: value
        })
      }
      fetch("http://127.0.0.1:3000/api", requestOptions)
          .then(response => response.json())
          .then(() => {
            console.log("data been changed")
          })
          .catch((err)=>alert(err))
    },
    updateWeekdays(weekdaysPickerId, day) {
      let weekdays_picker = this.weekdays_picker_array.find((obj)=>obj.id == weekdaysPickerId)
      weekdays_picker.days[day] = !weekdays_picker.days[day]
      this.patchWeekdays(weekdaysPickerId, day, weekdays_picker.days[day])
    },
    updateTimes(weekdaysPickerId, activity, value) {
      let weekdays_picker = this.weekdays_picker_array.find((obj)=>obj.id == weekdaysPickerId)
      weekdays_picker.times[activity] = value
      this.patchWeekdays(weekdaysPickerId, activity, value)
    },
    deleteComponent(weekdaysPickerId) {
      let self = this
      let requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: weekdaysPickerId,
        })
      }
      fetch("http://127.0.0.1:3000/api", requestOptions)
          .then(response => response.json())
          .then(() => {
            let index = self.weekdays_picker_array.findIndex((obj)=>obj.id == weekdaysPickerId)
            self.weekdays_picker_array.splice(index, 1)
          })
          .catch((err)=>alert(err))
    },
    getWeekdays(){
      let self = this
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
      fetch("http://127.0.0.1:3000/api", requestOptions)
          .then(response => response.json())
          .then((data) => {
            self.weekdays_picker_array = data
          })
          .catch((err)=>alert(err))
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media (max-width: 576px) {
  .add-btn{
    margin: 0.5rem;
  }
  .add-btn > button:after{
    content: 'Add';
    padding-left: 1rem;
  }
}
</style>
