<template>
  <div class="card">
    <div class="card-title">
      <h1>{{ title }}</h1>
      <button class="btn primary" @click="$emit('modal')" v-if="buttonName">{{ buttonName }}</button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    buttonName: String
  },
  emits: {
    modal: Function
  }
}
</script>

<style scoped>

</style>
