<template>
  <div class="card">
    <h1>Page was not found</h1>
    <router-link to="/" v-slot="{navigate}">
      <button class="btn" @click="navigate">Follow to main page</button>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
