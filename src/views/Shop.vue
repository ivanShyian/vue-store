<template>
  <div class="card">
    <div class="products-filter">
      <div class="form-control">
        <input type="text" placeholder="Найти товар...">
        <span class="form-control-clear">&times;</span>
      </div>
      <ul class="list">
        <li class="list-item">Все</li>
        <li class="list-item">
          Название категории
        </li>store.getters['products/products']
      </ul>
    </div>
    <div class="products-table">
      <div class="product-card"
           :key="product.id"
           v-for="product in products">
        <div class="product-img">
          <img :src="product.img">
        </div>
        <h4 class="product-title">{{ product.title }}</h4>
        <div class="text-center">
          <button class="btn">23</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
export default {
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('products/getProducts')
    })
    return {
      products: computed(() => store.getters['products/products'])
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
