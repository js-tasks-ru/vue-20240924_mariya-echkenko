import {computed, defineComponent, toRef} from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    weather: {
      type: Object,
      required: true,
    },
    temp: {
      type: String,
      required: true
    },

  },
  setup(props) {
    const weather = toRef(() => props.weather)
    const icons = WeatherConditionIcons;
    const icon = computed(() => icons[weather.value.id])

    return {
      icon,
    }
  },

  template: `
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="weather.description"> {{ icon }}</div>
      <div class="weather-conditions__temp">{{ temp }} °C</div>
    </div>
  `,
})
