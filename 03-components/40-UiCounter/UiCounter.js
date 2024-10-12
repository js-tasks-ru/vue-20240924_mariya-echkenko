import { defineComponent, toRef } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, {emit}) {
    const countRes = toRef(() => props.count)
    function handleDecrement() {
      emit('update:count', countRes.value - 1 )
    }
    function handleIncrement() {
      emit('update:count', countRes.value + 1 )
    }

    return {
      countRes,
      handleDecrement,
      handleIncrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton
        aria-label="Decrement"
        :disabled="countRes === min"
        @click="handleDecrement">➖</UiButton>
      <span class="count" data-testid="count">{{ countRes }}</span>
      <UiButton
        aria-label="Increment"
        :disabled="countRes === max"
        @click="handleIncrement">➕</UiButton>
    </div>
  `,
})
