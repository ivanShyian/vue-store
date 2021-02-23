<template>
  <div class="product-controls">
    <button class="btn danger" @click.stop="minusProduct">-</button>
    <strong>{{ counter }}</strong>
    <button class="btn primary"
            :disabled="productsAreOut"
            @click.stop="plusProduct">+</button>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  props: {
    count: {
      type: [Number, String],
      required: true
    }
  },
  setup(props, context) {
    const counter = ref(1)
    const productsAreOut = computed(() => counter.value === props.count)
    return {
      counter,
      productsAreOut,
      minusProduct: () => {
        if (counter.value !== 1) {
          counter.value--
        } else {
          context.emit('counterIsZero')
        }
      },
      plusProduct: () => {
        console.log(props.count)
        if (!productsAreOut.value) {
          counter.value++
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
