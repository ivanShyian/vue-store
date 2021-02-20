<template>
  <div class="modal-backdrop">
    <div class="modal">
      <admin-add-product v-if="product" @close-modal="$emit('close-modal')"></admin-add-product>
      <admin-add-category v-if="categories" @close-modal="$emit('close-modal')"></admin-add-category>
    </div>
  </div>
</template>

<script>
import AdminAddProduct from '@/components/admin/AdminAddProduct'
import AdminAddCategory from '@/components/admin/AdminAddCategory'
export default {
  emits: {
    'close-modal': {
      type: Function,
      required: false
    }
  },
  props: {
    product: {
      type: Boolean,
      required: false,
      default: false
    },
    categories: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: { AdminAddCategory, AdminAddProduct }
}
</script>

<style scoped>

</style>
