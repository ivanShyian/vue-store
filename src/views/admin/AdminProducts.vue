<template>
  <app-loading v-if="loading"></app-loading>
  <div class="card inventory" v-else>
    <div class="inventory__top">
      <h2>Инвентарь</h2>
      <button class="btn primary" @click="modal = true">Создать</button>
    </div>
    <div v-if="current">
      <admin-products-table :products="current"></admin-products-table>
      <app-pagination :pages="result.length"
                      @prev="previous"
                      @next="next"
                      @navigate="navigate"></app-pagination>
    </div>
    <teleport to="body" v-if="modal">
      <app-modal product @close-modal="modal = false"></app-modal>
    </teleport>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import AppModal from '@/components/ui/AppModal'
import AppPagination from '@/components/ui/AppPagination'
import AppLoading from '@/components/ui/AppLoading'

export default {
  setup() {
    const loading = ref(false)
    const modal = ref(false)
    const store = useStore()

    const page = ref(0)
    const count = ref(2)
    const result = ref([])

    const products = computed(() => store.getters['products/products'])
    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadProducts')
      loading.value = false
    })

    const current = computed(() => result.value[page.value])
    watch(products, (updated) => {
      let newArray = []
      result.value = updated.reduce((acc, item, idx, arr) => {
        if ((idx + 1) % count.value) {
          newArray.push(item)
          if (idx + 1 === arr.length) {
            acc.push(newArray)
          }
        } else {
          newArray.push(item)
          acc.push(newArray)
          newArray = []
        }
        return acc
      }, [])
    })
    const navigate = (idx) => {
      page.value = idx
    }
    const previous = () => {
      if (page.value) {
        page.value--
      }
    }
    const next = () => {
      if (page.value + 1 !== result.value.length) {
        page.value++
      }
    }
    return {
      loading,
      modal,
      products,
      result,
      current,
      navigate,
      next,
      previous
    }
  },
  components: {
    AppLoading,
    AppPagination,
    AdminProductsTable,
    AppModal
  }
}
</script>

<style scoped lang="scss">
.inventory__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
