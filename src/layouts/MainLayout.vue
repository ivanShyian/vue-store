<template>
  <the-navbar :admin="false"></the-navbar>
  <div class="container with-nav">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  components: { TheNavbar }
}
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
