import {defineComponent} from 'vue'

export default defineComponent({
  name: 'WeatherTitle',

  props: {
    name: {
      type: String,
      required: true,
    },
    dt: {
      type: String,
      required: true
    },

  },

  template: `
    <div>
      <h2 class="weather-card__name">{{ name }}</h2>
      <div class="weather-card__time">{{ dt }}</div>
    </div>
  `,
})
