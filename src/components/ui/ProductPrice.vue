<template>
  <div class="text-center">
    <button class="btn"
    >{{ currency(price) }}
    </button>
  </div>
</template>

<script>
import { currency } from '@/utils/currency'
export default {
  props: {
    price: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      currency
    }
  }
}
</script>

<style scoped>

</style>
