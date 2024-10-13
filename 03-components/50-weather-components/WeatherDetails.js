import {defineComponent} from 'vue'

export default defineComponent({
  name: 'WeatherDetails',

  props: {
    weatherDetails: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="weather-details">
      <div v-for="itemDetail in weatherDetails" class="weather-details__item">
        <div class="weather-details__item-label">{{ itemDetail.name }}</div>
        <div class="weather-details__item-value">{{ itemDetail.value }}</div>
      </div>
    </div>
  `,
})
