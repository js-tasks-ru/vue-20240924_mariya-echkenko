import {computed, defineComponent, toRef} from 'vue'
import UiAlert from './UiAlert.js'
import WeatherTitle from './WeatherTitle.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetails from './WeatherDetails.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    UiAlert,
    WeatherTitle,
    WeatherConditions,
    WeatherDetails,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup (props) {
    const item = toRef(() => props.item)

    const checkNight = computed(() => item.value.current.dt < item.value.current.sunrise || item.value.current.dt > item.value.current.sunset)

    const temp = computed(() => (item.value.current.temp- 273.15).toFixed(1))

    const pressure = computed(() => Math.round(item.value.current.pressure * 0.75))
    const humidity = computed(() => item.value.current.humidity)
    const clouds = computed(() => item.value.current.clouds)
    const windSpeed = computed(() => item.value.current.wind_speed)

    const weatherDetails = [
      {name: 'Давление, мм рт. ст.', value: pressure},
      {name: 'Влажность, %', value: humidity},
      {name: 'Облачность, %', value: clouds},
      {name: 'Ветер, м/с', value: windSpeed},
    ]

    return {
      checkNight,
      temp,
      weatherDetails,
    }
  },

  template: `
    <li class="weather-card" :class="{'weather-card--night': checkNight}">
      <UiAlert v-if="item.alert" :name="item.alert.sender_name" :description="item.alert.description" />
      <WeatherTitle :name="item.geographic_name" :dt="item.current.dt" />
      <WeatherConditions :weather="item.current.weather" :temp="temp" />
      <WeatherDetails :weatherDetails="weatherDetails" />
    </li>
  `,
})
