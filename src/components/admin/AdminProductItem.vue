<template>
  <tr class="inventory-table__item">
    <td>{{ idx + 1 }}</td>
    <td>{{ product.title }}</td>
    <td><img :src="product.img" alt="" height="50" width="50"></td>
    <td>{{ currency(product.price) }}</td>
    <td v-if="category">{{ category.title }}</td>
    <td>{{ product.count }}</td>
    <td>
      <button @click="$router.push(`product/${product.id}`)" class="btn">Открыть</button>
    </td>
  </tr>
</template>

<script>
import { currency } from '@/utils/currency'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const category = computed(() => store.getters['categories/categories']
      .find(el => el.type === props.product.category))

    return {
      currency,
      category
    }
  }
}
</script>

<style scoped lang="scss">
.inventory-table__item {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, .1);
  td {
    text-align: center;
    flex: 0 0 15%;
  }
  td:first-child {
    flex: 0 0 10%;
    margin-left: -.5rem;
  }
}
</style>
