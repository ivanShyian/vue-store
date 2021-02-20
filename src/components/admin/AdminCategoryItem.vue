<template>
  <tr class="categories-table__item"
    v-for="category in categories" :key="category.id">
    <td>{{ category.id }}</td>
    <td>{{ category.title }}</td>
    <td>{{ category.type }}</td>
    <td><button class="btn danger" @click="deleteCategory(category.id)">Удалить</button></td>
  </tr>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    categories: {
      type: Array,
      required: false
    }
  },
  setup() {
    const store = useStore()
    const deleteCategory = async (idx) => {
      await store.dispatch('categories/deleteCategory', idx)
    }
    return {
      deleteCategory
    }
  }
}
</script>

<style scoped lang="scss">
.categories-table__item {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, .1);
  td {
    text-align: center;
    flex: 0 0 26.8%;
    margin: .5rem 0;
  }
  td:first-child {
    flex: 0 0 20%;
  }
}
</style>
