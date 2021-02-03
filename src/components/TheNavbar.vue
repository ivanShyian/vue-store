<template>
  <div class="navbar">
    <h4>Online store</h4>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
    </ul>
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
