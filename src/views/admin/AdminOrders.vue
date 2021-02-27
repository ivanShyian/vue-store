<template>
  <app-loading v-if="loading"></app-loading>
  <AdminCard title="Заказы"
             @modal="modal = true"
             v-else>
    <admin-orders-table v-if="hasData" :orders="orders"></admin-orders-table>
    <h1 class="text-center" v-else>
      Список заказов пуст
    </h1>
  </AdminCard>
</template>

<script>
import AdminCard from '@/components/admin/AdminCard'
import AppLoading from '@/components/ui/AppLoading'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const orders = computed(() => store.getters['orders/orders'])
    const hasData = computed(() => orders.value.length && !loading.value)
    onMounted(async () => {
      loading.value = true
      await store.dispatch('orders/loadOrders')
      loading.value = false
    })
    return {
      hasData,
      loading,
      orders
    }
  },
  components: { AdminOrdersTable, AppLoading, AdminCard }
}
</script>

<style scoped>

</style>
