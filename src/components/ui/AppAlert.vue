<template>
  <div class="alert primary"
       :class="['alert', alert.type]"
       v-if="alert">
    <div class="alert-close">&times;</div>
    <p class="alert-title">{{ title }}</p>
    <p>{{ alert.text }}</p>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()
    const alert = computed(() => store.getters['alert/isAlert'])
    const TITLE_MAP = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимание!'
    }
    const title = computed(() => alert.value ? TITLE_MAP[alert.value.type] : '')
    return {
      alert,
      title
    }
  }
}
</script>

<style scoped lang="scss">
div.alert {
  position: absolute;
  top: 7%;
  right: 1%;
  width: 20rem;
  span {
    display: block;
  }
}
</style>
