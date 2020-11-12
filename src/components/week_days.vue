<template>
  <div class="weekday-picker d-flex flex-row justify-content-around align-items-center">
    <div class="btn-group" role="group" aria-label="weekdays">
      <button
          type="button"
          class="btn btn-outline-info col-4"
          v-for="(val, key) in days"
          :key="key"
          @click="dayClick(key)"
          :class="{active: val}">{{ key }}</button>
    </div>
    <div class="times-elements d-flex flex-row justify-content-between align-items-center">
      <span class="d-flex flex-row align-items-center pr-2">
        <input
            class="input-group-text"
            type="checkbox"
            :checked="times.allDay"
            @change="updateTime($event,'allDay')" aria-label="24h"/>
        <label class="pl-1 pr-2 m-0">24h</label>
      </span>
      <input
          type="time"
          class="col"
          name="open-time"
          placeholder="Open time"
          :value="times.open"
          :disabled="times.allDay"
          @change="updateTime($event,'open')">
      <div class="px-1"> to: </div>
      <input
          type="time"
          class="col"
          name="close-time"
          placeholder="Close time"
          :value="times.close"
          :disabled="times.allDay"
          @change="updateTime($event, 'close')">
    </div>
    <div class="action-btn d-flex flex-column">
      <button type="button" class="btn btn-outline-info" name="delete-weekdays" @click="deleteComponent">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
      <button type="button" class="btn btn-outline-info" name="copy-weekdays">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-stickies" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M0 1.5A1.5 1.5 0 0 1 1.5 0H13a1 1 0 0 1 1 1H1.5a.5.5 0 0 0-.5.5V14a1 1 0 0 1-1-1V1.5z"/>
          <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h11A1.5 1.5 0 0 1 16 3.5v6.086a1.5 1.5 0 0 1-.44 1.06l-4.914 4.915a1.5 1.5 0 0 1-1.06.439H3.5A1.5 1.5 0 0 1 2 14.5v-11zM3.5 3a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h6.086a.5.5 0 0 0 .353-.146l4.915-4.915A.5.5 0 0 0 15 9.586V3.5a.5.5 0 0 0-.5-.5h-11z"/>
          <path fill-rule="evenodd" d="M10.5 10a.5.5 0 0 0-.5.5v5H9v-5A1.5 1.5 0 0 1 10.5 9h5v1h-5z"/>
        </svg>
      </button>
    </div>

  </div>

</template>

<script>
export default {
  name: 'WeekdaysPicker',
  data() {
    return {}
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    days: {
      Sunday: {
        type: Boolean,
        default: false,
      },
      Monday: {
        type: Boolean,
        default: false,
      },
      Tuesday: {
        type: Boolean,
        default: false,
      },
      Wednesday: {
        type: Boolean,
        default: false,
      },
      Thursday: {
        type: Boolean,
        default: false,
      },
      Friday: {
        type: Boolean,
        default: false,
      },
      Saturday: {
        type: Boolean,
        default: false,
      },
    },
    times: {
      open: String | null,
      close: String | null,
      allDay: {
        type: Boolean,
        default: false,
      }
    },
  },
  methods: {
    dayClick(day) {
      this.$emit('update-weekdays', this.id, day)
    },
    updateTime(evt, activity) {
      let val = null
      if (activity == 'allDay')
        val = evt.target.checked
      else val = evt.target.value
      this.$emit('update-time', this.id, activity, val)
    },
    deleteComponent() {
      this.$emit('delete-component', this.id)
    }
  },
}   
</script>

<style>
  .weekday-picker{
    border-bottom: 0.1rem solid #17a2b8;
    padding: 3rem 0;
  }

  input.input-group-text{
    display: inline-block;
    background-color: white;
    color: #17a2b8;
    border-color: #17a2b8;
  }

  @media (min-width: 577px) {
    .weekday-picker > .action-btn > button{
      border: none;
    }
  }
  @media (max-width: 576px) {
    .weekday-picker.flex-row{
      flex-direction: column !important;
    }

    .weekday-picker>.btn-group{
      flex-direction: column !important;
      width: 100%;
      align-items: center;
    }
    .weekday-picker > div, .weekday-picker>.btn-group>button{
      width: 100%;
      max-width: 100%;
    }
    .weekday-picker .times-elements{
      margin: 2rem 0;
    }
    .weekday-picker>.action-btn > button{
      margin: 0.5rem 0;
    }
    .weekday-picker>.action-btn [name=delete-weekdays]:after{
      content: 'Delete';
      padding-left: 1rem;
    }
    .weekday-picker>.action-btn [name=copy-weekdays]:after{
      content: 'Copy';
      padding-left: 1rem;
    }
  }
</style>