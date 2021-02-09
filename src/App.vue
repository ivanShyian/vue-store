<template>
  <app-alert></app-alert>
  <component :is="layout + '-layout'" v-if="layout"></component>
</template>
<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import AppAlert from '@/components/ui/AppAlert'
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
    AppAlert,
    MainLayout,
    AuthLayout,
    AdminLayout
  }
}
</script>
<style lang="scss">
</style>
