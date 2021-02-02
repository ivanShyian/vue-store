<template>
  <component :is="layout + '-layout'"></component>
</template>
<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    MainLayout,
    AuthLayout
  }
}
</script>
<style lang="scss">
</style>
