<template>
  <div class="text-center">
    <button class="btn"
            v-if="!notAvailable"
            @click.stop="$emit('buy')"
    >{{ currency(price) }}
    </button>
    <p v-else>Нет в наличии</p>
  </div>
</template>

<script>
import { currency } from '@/utils/currency'
import { computed } from 'vue'
export default {
  emits: {
    buy: Function
  },
  props: {
    price: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: false,
      default: Number
    }
  },
  setup(props) {
    const notAvailable = computed(() => props.count <= 0)
    return {
      notAvailable,
      currency
    }
  }
}
</script>

<style scoped>
</style>
