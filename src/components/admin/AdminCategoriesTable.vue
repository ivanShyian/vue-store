<template>
  <table class="categories__content categories-table">
    <tr class="categories-table__headers">
      <th>#</th>
      <th>Название</th>
      <th>Действие</th>
    </tr>
    <admin-category-item :categories="categories"></admin-category-item>
  </table>
</template>

<script>
import AdminCategoryItem from '@/components/admin/AdminCategoryItem'
export default {
  components: { AdminCategoryItem },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  setup() {
  }
}
</script>

<style scoped lang="scss">
.categories-table {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__headers {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
}
</style>
