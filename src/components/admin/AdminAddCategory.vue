<template>
  <div class="add-product">
    <h3 class="text-center">Добавить категорию</h3>
    <div class="form-control">
      <label for="categoryTitle">Название</label>
      <input id="categoryTitle" type="text" v-model="newCategory.title">
    </div>
    <div class="form-control">
      <label for="categoryName">Код</label>
      <input id="categoryName" type="text" v-model="newCategory.type">
    </div>
    <div class="bottom-btns">
      <button class="btn primary" :disabled="isEmpty" @click.prevent="addCategory">Добавить</button>
      <button class="btn warning" @click.prevent="$emit('close-modal')">Отменить</button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
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
    const newCategory = reactive({
      title: '',
      type: ''
    })
    const isEmpty = computed(
      () => !newCategory.title.length || !newCategory.type.length)
    const addCategory = async () => {
      await store.dispatch('categories/addCategory', newCategory)
      emit('close-modal')
    }
    return {
      isEmpty,
      newCategory,
      addCategory
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
