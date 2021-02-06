<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text"
             :value="search"
             @input="$emit('update:search', $event.target.value)"
             placeholder="Найти товар...">
      <span class="form-control-clear"
            @click="$emit('clear-query')"
      >&times;</span>
    </div>
    <ul class="list">
      <li class="list-item"
          :class="{'active-link': category === 'all'}"
          @click="$emit('set-category', 'all')"
      >Все</li>
      <li class="list-item"
          v-for="filter in filters"
          :key="filter.id"
          :class="{'active-link': filter.type === category}"
          @click.prevent="$emit('set-category', filter.type)"
      >{{ filter.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: {
    'update:search': {
      type: String,
      required: false,
      default: null
    },
    'set-category': String,
    'clear-query': Function
  },
  props: {
    filters: {
      type: Array,
      required: true,
      default: Array
    },
    search: {
      type: String,
      required: false,
      default: null
    },
    category: {
      type: String,
      required: false,
      default: String
    }
  }
}
</script>

<style scoped>
li.list-item.active-link {
  background: #eee;
}
</style>
