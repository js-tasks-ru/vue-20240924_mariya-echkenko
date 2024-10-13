import {defineComponent} from 'vue'

export default defineComponent({
  name: 'UiAlert',

  props: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },

  },

  template: `
    <div class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ name }}: {{ description }}</span>
    </div>
  `,
})
