<template>
  <div class="add-product">
    <h3 class="text-center">Добавить товар</h3>
    <div class="form-control">
      <label for="prod-name">Название</label>
      <input id="prod-name" type="text" v-model="newProduct.title">
    </div>
    <div class="form-control">
      <label for="prod-img">Изображение</label>
      <input id="prod-img" type="text" v-model="newProduct.img">
    </div>
    <div class="form-control">
      <label for="prod-count">Количество</label>
      <input id="prod-count" type="text" v-model="newProduct.count">
    </div>
    <div class="form-control">
      <label for="prod-price">Цена</label>
      <input id="prod-price" type="text" v-model="newProduct.price">
    </div>
    <div class="form-control">
      <label for="prod-cat">Категория</label>
      <select id="prod-cat" v-model="newProduct.category">
        <option>Choose..</option>
        <option :value="category.type"
                v-for="category in categories"
                :key="category.id">
          {{ category.title }}
        </option>
      </select>
    </div>
    <div class="bottom-btns">
      <button class="btn primary" :disabled="isEmpty" @click.prevent="addProduct">Добавить</button>
      <button class="btn warning" @click.prevent="$emit('close-modal')">Отменить</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: {
    'close-modal': {
      type: Function,
      required: false
    }
  },
  setup(_, { emit }) {
    const store = useStore()
    const newProduct = reactive({
      title: '',
      img: '',
      count: 0,
      price: 0,
      category: 'Choose..'
    })
    onMounted(() => store.dispatch('categories/loadCategories'))

    const isEmpty = computed(
      () => !newProduct.title.length ||
                  !newProduct.img.length ||
                  newProduct.price === 0 ||
                  newProduct.category === 'Choose..')

    const categories = computed(() => store.getters['categories/categories'])
    const setCategory = (type) => {
      newProduct.category = type
    }
    const addProduct = async () => {
      if (!isEmpty.value) {
        await store.dispatch('products/addProduct', newProduct)
        emit('close-modal')
      }
    }
    return {
      newProduct,
      categories,
      setCategory,
      addProduct,
      isEmpty
    }
  }
}
</script>

<style scoped lang="scss">
.bottom-btns {
  display: flex;
  justify-content: space-between;
}
</style>
