<template>
  <tbody>
  <tr v-for="product in bought"
      :key="product.id">
    <td>{{ product.title }}</td>
    <td>
      <button class="btn danger" @click="$emit('minus')">-
      </button>
      {{ product.count }}
      <button class="btn primary" @click="$emit('plus')">+
      </button>
    </td>
    <td>{{ product.price }} руб</td>
  </tr>
  </tbody>
</template>
<script>

export default {
  emits: {
    minus: {
      type: Function,
      required: false
    },
    plus: {
      type: Function,
      required: false
    }
  },
  props: {
    bought: {
      type: Array,
      required: false,
      default: Array
    }
  },
  setup(props) {
    return {
    }
  }
}
</script>

<style scoped>

</style>
