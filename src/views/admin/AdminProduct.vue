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
        <button class="btn danger">Удалить</button>
      </div>
    </div>
    <teleport to="body">
      <app-confirm title="Вы не сохранили изменения. Покинуть страницу?"
                   v-if="confirm"
                   @confirm="submit"
                   @denied="confirm = false"
      ></app-confirm>
    </teleport>
  </div>
</template>

<script>
import { useRoute, onBeforeRouteLeave, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  components: { AppConfirm },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const product = ref(null)
    const confirm = ref(false)
    const flag = ref(false)
    const leaveTo = ref('')
    const initial = computed(() => store.getters['products/product'](route.params.id))
    const categories = computed(() => store.getters['categories/categories'])

    onMounted(async () => {
      await store.dispatch('products/loadProducts')
      await store.dispatch('categories/loadCategories')
      product.value = { ...initial.value }
    })
    const hasChanges = computed(() =>
      initial.value.title !== product.value.title ||
      initial.value.img !== product.value.img ||
      +initial.value.count !== +product.value.count ||
      +initial.value.price !== +product.value.price ||
      initial.value.category !== product.value.category
    )
    const change = async () => {
      await store.dispatch('products/updateProduct', product.value)
      product.value = { ...initial.value }
    }
    const submit = async () => {
      confirm.value = false
      flag.value = true
      router.push(leaveTo.value)
    }
    onBeforeRouteLeave((to, from) => {
      leaveTo.value = to.path
      if (flag.value) {
        return true
      }
      if (hasChanges.value) {
        confirm.value = true
        return false
      }
      return true
    })
    return {
      confirm,
      submit,
      change,
      product,
      categories,
      hasChanges
    }
  }
}
</script>

<style scoped lang="scss">
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
