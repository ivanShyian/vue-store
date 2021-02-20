<template>
  <tr class="categories-table__item"
    v-for="category in categories" :key="category.id">
    <td>{{ category.id }}</td>
    <td>{{ category.title }}</td>
    <td><button class="btn danger">Удалить</button></td>
  </tr>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: false
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
    flex: 0 0 35%;
    margin: .5rem 0;
  }
  td:first-child {
    flex: 0 0 30%;
  }
  td:last-child {
  }
}
</style>
