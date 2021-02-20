<template>
  <div class="card modal">
    <h4 class="text-center">{{ title }}</h4>
    <div>
      <button class="btn primary" @click="$emit('confirm')">Да</button>
      <button class="btn danger" @click="$emit('denied')">Отменить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped lang="scss">
.modal {
  width: auto;
}
.modal div {
  display: flex;
  justify-content: center;
}
</style>
