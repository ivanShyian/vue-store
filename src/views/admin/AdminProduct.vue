<template>
  <div class="card" v-if="product">
    <div class="product-info">
      <h1>{{ product.title }}</h1>
      <img :src="product.img" width="100" alt="">
      <div class="form-control">
        <label for="prod-name">Название</label>
        <input id="prod-name" v-model="product.title">
      </div>
      <div class="form-control">
        <label for="prod-img">Изображение</label>
        <input id="prod-img" v-model="product.img">
      </div>
      <div class="form-control">
        <label for="prod-count">Количество на складе</label>
        <input id="prod-count" v-model="product.count">
      </div>
      <div class="form-control">
        <label for="prod-cost">Цена</label>
        <input id="prod-cost" v-model="product.price">
      </div>
      <div class="form-control">
        <label for="prod-cat">Категория</label>
        <select id="prod-cat" v-model="product.category">
          <option v-for="cat in categories"
                  :value="cat.type"
                  :key="cat.id"
          >{{ cat.title }}
          </option>
        </select>
      </div>
      <div>
        <button class="btn primary" v-if="hasChanges" @click="change">Изменить</button>
        <button class="btn danger" @click="deleteProduct(product.id)">Удалить</button>
      </div>
    </div>
    <teleport to="body">
      <transition name="confirm-trans"
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <app-confirm :title="titleMessage"
                     v-if="confirm"
                     @confirm="submit"
                     @denied="confirm = false"
        ></app-confirm>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from '@/use/confirm'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const product = ref(null)
    const initial = computed(() => store.getters['products/product'](route.params.id))
    const categories = computed(() => store.getters['categories/categories'])
    const deleteFlag = ref(false)
    const titleMessage = computed(() => {
      return deleteFlag.value
        ? `Вы уверены, что хотите удалить "${product.value.title}"?`
        : 'Вы не сохранили изменения. Покинуть страницу?'
    })

    onMounted(async () => {
      await store.dispatch('products/loadProducts')
      await store.dispatch('categories/loadCategories')
      product.value = { ...initial.value }
    })
    const hasChanges = computed(() =>
      initial.value ? initial.value.title !== product.value.title ||
        initial.value.img !== product.value.img ||
        +initial.value.count !== +product.value.count ||
        +initial.value.price !== +product.value.price ||
        initial.value.category !== product.value.category : false
    )

    const {
      submit,
      confirm,
      flag
    } = useConfirm(hasChanges, deleteFlag)

    const change = async () => {
      await store.dispatch('products/updateProduct', product.value)
      product.value = { ...initial.value }
    }
    const deleteProduct = () => {
      deleteFlag.value = true
      confirm.value = true
    }
    watch(flag, async (response) => {
      if (response && deleteFlag.value) {
        await store.dispatch('products/deleteProduct', product.value.id)
        await router.push('/admin/products')
      }
    })
    return {
      confirm,
      submit,
      change,
      product,
      categories,
      hasChanges,
      deleteProduct,
      titleMessage
    }
  },
  components: { AppConfirm }
}
</script>

<style scoped lang="scss">
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
