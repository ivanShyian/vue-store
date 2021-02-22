import { computed, ref, watch } from 'vue'

export function usePagination(array) {
  const page = ref(0)
  const count = ref(5)
  const result = ref([])
  const current = computed(() => result.value[page.value])
  watch(array, updated => {
    let newArray = []
    result.value = array.value.reduce((acc, item, idx, arr) => {
      if ((idx + 1) % count.value) {
        newArray.push(item)
        if (idx + 1 === arr.length) {
          acc.push(newArray)
        }
      } else {
        newArray.push(item)
        acc.push(newArray)
        newArray = []
      }
      return acc
    }, [])
  })
  return {
    result,
    current,
    page,
    count
  }
}
