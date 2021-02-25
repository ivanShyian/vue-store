<template>
  <div class="alert primary"
       :class="['alert', alert.type]"
       v-if="alert">
    <div class="alert-close" @click.prevent="closeAlert">&times;</div>
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
    const title = computed(() => alert.value ? TITLE_MAP[alert.value.type] : '')
    const TITLE_MAP = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимание!'
    }
    const closeAlert = () => store.commit('alert/clearAlert')
    return {
      closeAlert,
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
  z-index: 10;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
  span {
    display: block;
  }
}
.alert-close {
  cursor: pointer;
}
</style>
