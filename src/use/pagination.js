import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export function usePagination(array, currentPage, count = 5) {
  const router = useRouter()

  const page = ref(+currentPage.value || 1)
  const result = ref([])
  const current = computed(() => result.value[page.value - 1])

  watch(page, query => router.replace({ query: { page: query } }))

  watch(array, updated => {
    let newArray = []
    result.value = array.value.reduce((acc, item, idx, arr) => {
      if ((idx + 1) % count) {
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
