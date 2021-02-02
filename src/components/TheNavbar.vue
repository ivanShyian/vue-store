<template>
  <div class="navbar">
    <h4>Online store</h4>
    <div class="navbar-menu" v-if="$route.meta.layout === 'main'">
      <a href="#">Магазин</a>
      <a href="#">Корзина</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.navbar-menu a:first-child {
  margin-right: 2rem;
}
</style>
