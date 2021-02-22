<template>
  <div class="app-pagination pagination pt-1">
    <button class="btn"
            v-text="'<'"
            :disabled="+modelValue + 1 === 1"
            @click="$emit('update:modelValue', modelValue - 1)"></button>
    <button :class="['btn', modelValue + 1 === page ? 'primary' : '']"
            v-for="page in pages"
            :key="page"
            @click.prevent="$emit('update:modelValue', page - 1)">{{ page }}</button>
    <button class="btn"
            v-text="'>'"
            :disabled="+modelValue + 1 === pages"
            @click="$emit('update:modelValue', modelValue + 1)"></button>
  </div>
</template>

<script>
export default {
  emits: {
    navigate: {
      type: Function
    },
    'update:modelValue': {
      type: Function
    }
  },
  props: {
    pages: {
      type: Number,
      required: false
    },
    modelValue: {
      type: Number,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
button.btn {
  border-radius: 0;
  padding: .3rem .6rem;
}
</style>
