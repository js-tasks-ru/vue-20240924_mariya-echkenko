import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',
  setup () {
    function formatAsLocalDate() {
      return new Date().toLocaleString(navigator.language, {
        dateStyle: 'long'
      })
    }

    return {
      formatAsLocalDate,
    }
  },
  template: `<div>Сегодня {{ formatAsLocalDate() }}</div>`
})

const app = createApp(App);
const vm = app.mount('#app');
