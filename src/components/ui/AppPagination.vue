<template>
  <div class="app-pagination pagination pt-1">
    <button class="btn" v-text="'<<'" @click="prev"></button>
    <button :class="['btn', activePage === page ? 'primary' : '']"
            v-for="page in pages"
            :key="page"
            @click.prevent="navigateTo(page)">{{ page }}</button>
    <button class="btn" v-text="'>>'" @click="next"></button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: {
    navigate: {
      type: Function
    },
    next: {
      type: Function
    },
    prev: {
      type: Function
    }
  },
  props: {
    pages: {
      type: Number,
      required: false
    }
  },
  setup(props, { emit }) {
    const activePage = ref(1)
    const navigateTo = (idx) => {
      activePage.value = idx
      emit('navigate', idx - 1)
    }
    const next = () => {
      if (activePage.value !== props.pages) {
        activePage.value++
        emit('next')
      }
    }
    const prev = () => {
      if (activePage.value !== 1) {
        activePage.value--
        emit('prev')
      }
    }
    return {
      activePage,
      navigateTo,
      next,
      prev
    }
  }
}
</script>

<style scoped lang="scss">
button.btn {
  border-radius: 0;
  padding: .3rem .6rem;
}
</style>
