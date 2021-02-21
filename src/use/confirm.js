import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ref } from 'vue'

export function useConfirm(hasChanges) {
  const router = useRouter()
  const flag = ref(false)
  const leaveTo = ref('')
  const confirm = ref(false)

  const submit = () => {
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
    submit,
    confirm,
    flag
  }
}
