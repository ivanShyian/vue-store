<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text"
             :value="modelValue.search"
             @input="setQuery"
             placeholder="Найти товар...">
      <span class="form-control-clear"
            @click="clearFilter"
      >&times;</span>
    </div>
    <ul class="list">
      <li class="list-item"
          :class="{'active-link': modelValue.category === ''}"
          @click="setCategory('')"
      >Все</li>
      <li class="list-item"
          v-for="category in categories"
          :key="category.id"
          :class="{'active-link': category.type === modelValue.category}"
          @click.prevent="setCategory(category.type)"
      >{{ category.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  emits: {
    'update:modelValue': {
      type: Object,
      required: false
    }
  },
  props: {
    modelValue: {
      type: Object,
      required: false
    },
    categories: {
      type: Array,
      required: true,
      default: Array
    }
  },
  setup(props, context) {
    const router = useRouter()

    const category = ref(props.modelValue.category)
    const search = ref(props.modelValue.search)
    watch([search, category], ([sv, cv]) => {
      const query = {}
      if (sv) {
        query.search = sv
      }
      if (cv) {
        query.category = cv
      }
      router.replace({ query })
      console.log(query)
      context.emit('update:modelValue', { search: sv, category: cv })
    })
    const setCategory = (type) => {
      category.value = type
    }
    const setQuery = (event) => {
      search.value = event.target.value
    }
    const clearFilter = () => {
      category.value = ''
      search.value = ''
      router.replace('/')
    }
    return {
      category,
      search,
      setCategory,
      setQuery,
      clearFilter
    }
  }
}
</script>

<style scoped>
li.list-item.active-link {
  background: #eee;
}
</style>
