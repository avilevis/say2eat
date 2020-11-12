import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import WeekdaysPicker from './components/week_days.vue'

const app = createApp(App)
app.component('weekdays-picker', WeekdaysPicker)
app.component('vue-timepicker', VueTimepicker)
app.mount('#app')

