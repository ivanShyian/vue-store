<template>
  <tr>
    <td>{{ item.title }}</td>
    <td>
      <button class="btn danger"
              @click.prevent="minus">-
      </button>
      <span>{{ item.quantity }}</span>
      <button class="btn primary"
              :disabled="productsAreOut"
              @click.prevent="plus">+
      </button>
    </td>
    <td>{{ item.price }} руб</td>
  </tr>
</template>

<script>
import { useCart } from '@/use/cart'
import { onMounted } from 'vue'

export default {
  props: {
    item: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const { minus, counter, plus, productsAreOut } = useCart(props.item)
    onMounted(() => (counter.value = props.item.quantity))
    return {
      minus,
      counter,
      plus,
      productsAreOut
    }
  }
}
</script>

<style scoped lang="scss">
tr td {
  flex: 0 0 33.333%;
}
button:last-child {
  margin: 0 0 0 10px;
}
</style>
