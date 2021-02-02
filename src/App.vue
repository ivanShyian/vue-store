<template>
  <app-alert></app-alert>
  <component :is="layout + '-layout'" v-if="layout"></component>
</template>
<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AppAlert from '@/components/ui/AppAlert'
export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    AppAlert,
    MainLayout,
    AuthLayout
  }
}
</script>
<style lang="scss">
</style>
