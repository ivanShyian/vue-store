<template>
  <app-loading v-if="loading"></app-loading>
  <AdminCard title="Заказы"
             @modal="modal = true"
             v-else>
    <div class="orders-page">
      <admin-orders-filter v-model="query"></admin-orders-filter>
      <admin-orders-table v-if="hasData && orders.length" :orders="orders"></admin-orders-table>
      <h1 class="text-center" v-else>
        Список заказов пуст
      </h1>
    </div>
  </AdminCard>
</template>

<script>
import AdminCard from '@/components/admin/AdminCard'
import AppLoading from '@/components/ui/AppLoading'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AdminOrdersFilter from '@/components/admin/AdminOrdersFilter'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const loading = ref(true)
    const router = useRouter()
    const route = useRoute()
    const orders = computed(() => store.getters['orders/orders'](query.value))
    const hasData = computed(() => orders.value.length && !loading.value)
    const query = ref('')

    watch(query, qv => {
      if (!qv.length) {
        return router.replace('')
      }
      router.replace({ query: { order: qv } })
    })

    onMounted(async () => {
      await store.dispatch('orders/loadOrders')
      query.value = route.query.order ? route.query.order : ''
      loading.value = false
    })
    return {
      hasData,
      loading,
      orders,
      query
    }
  },
  components: {
    AdminOrdersFilter,
    AdminOrdersTable,
    AppLoading,
    AdminCard
  }
}
</script>

<style scoped lang="scss">
.orders-page {
  display: flex;
  flex-direction: column;
}
</style>
