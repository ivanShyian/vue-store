import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ref } from 'vue'

export function useConfirm(hasChanges) {
  const router = useRouter()
  const flag = ref(false)
  const leaveTo = ref('')
  const confirm = ref(false)

  const submit = async () => {
    confirm.value = false
    flag.value = true
    await router.push(leaveTo.value)
    flag.value = false
  }
  onBeforeRouteLeave((to) => {
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
