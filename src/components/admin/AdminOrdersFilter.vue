<template>
  <div class="orders-filter">
    <span v-for="b in buttons"
          :class="{ active: b.name === modelValue }"
          @click="$emit('update:modelValue', b.name)"
          :key="b.id">{{ b.label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: false
    }
  },
  emits: {
    'update:modelValue': Function
  },
  setup() {
    const buttons = [
      { id: 0, label: 'Новые', name: '' },
      { id: 1, label: 'В работе', name: 'performing' },
      { id: 2, label: 'Выполненные', name: 'done' }
    ]
    return {
      buttons
    }
  }
}
</script>

<style scoped lang="scss">
.orders-filter {
  display: flex;
  justify-content: space-evenly;
  padding: 0;
  margin: 0 auto;
  border-radius: 2rem;
  width: 70%;
  border: 1px solid rgba(0, 0, 0, .25);
  overflow: hidden;
  span {
    flex: 0 0 37%;
    text-align: center;
    padding: .3rem 0;
    cursor: pointer;
  }
  span:first-child {
    flex: 0 0 27%;
  }
  span.active {
    background-color: rgba(0, 0, 200, .2);
  }
}
</style>
