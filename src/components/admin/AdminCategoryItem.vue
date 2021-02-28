<template>
  <tr class="categories-table__item"
    v-for="(category, idx) in categories" :key="category.id">
    <td>{{ idx + 1 }}</td>
    <td>{{ category.title }}</td>
    <td>{{ category.type }}</td>
    <td><button class="btn danger" @click="deleteCategory(category.id)">Удалить</button></td>
  </tr>
  <teleport to="body">
    <transition name="confirm-trans"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut">
      <app-confirm title="Удалить категорию?"
                   v-if="confirm"
                   @confirm="submit"
                   @denied="confirm = false"
      ></app-confirm>
    </transition>
  </teleport>
</template>

<script>
import { useStore } from 'vuex'
import { useConfirm } from '@/use/confirm'
import { ref, watch } from 'vue'
import AppConfirm from '@/components/ui/AppConfirm'
export default {
  props: {
    categories: {
      type: Array,
      required: false
    }
  },
  setup() {
    const store = useStore()
    const currentCategory = ref(null)
    const { confirm, flag, submit } = useConfirm(true)
    const deleteCategory = async (idx) => {
      currentCategory.value = idx
      confirm.value = true
    }
    watch(flag, async (response) => {
      if (response) {
        await store.dispatch('categories/deleteCategory', currentCategory.value)
      }
    })
    return {
      deleteCategory,
      submit,
      confirm,
      flag
    }
  },
  components: { AppConfirm }
}
</script>

<style scoped lang="scss">
.categories-table__item {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, .1);
  margin: 0 .5rem;
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
