import {defineComponent, onMounted, onUnmounted, ref} from 'vue'

function formattedTime() {
  return new Date().toLocaleString(navigator.language, {
    timeStyle: 'medium'
  })
}

export default defineComponent({
  name: 'UiClock',

  setup() {
    const timerId = ref(null);
    const time = ref(formattedTime());

    function clockStart() {
      timerId.value = setInterval(() => {
        time.value = formattedTime();
      }, 1000);
    }

    function clockStop() {
      clearInterval(timerId.value);
    }


    onMounted(clockStart);
    onUnmounted(clockStop);

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
