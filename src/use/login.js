import { useField, useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm(cart, register) {
  const PASSWORD_LENGTH = 6
  const store = useStore()
  const router = useRouter()
  const { submitCount, isSubmitting, handleSubmit } = useForm()
  const { value: name, handleBlur: nameBlur, errorMessage: nameError } = useField(
    'name',
    register.value ? yup.string().trim().required('Введите ваше имя') : yup.string().trim()
  )
  const { value: email, handleBlur: emailBlur, errorMessage: emailError } = useField(
    'email',
    yup.string().trim().required('Введите email').email('Необходимо ввести корректный email')
  )
  const { value: password, handleBlur: passwordBlur, errorMessage: passwordError } = useField(
    'password',
    yup.string().trim().required('Введите пароль').min(PASSWORD_LENGTH, `Пароль не может быть меньше ${PASSWORD_LENGTH} символов`)
  )
  const isTooManyAttempts = computed(() => submitCount.value >= 3)
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 3000)
    }
  })
  const onSubmit = handleSubmit(async (values) => {
    try {
      if (register.value) {
        await store.dispatch('auth/register', values)
        if (cart) {
          router.replace({ name: 'Cart' })
        } else {
          router.push('/')
        }
      } else {
        const { name, ...data } = values
        await store.dispatch('auth/login', data)
        if (store.getters['auth/userRole'] === 'admin') {
          router.push('/admin')
        } else if (cart) {
          router.replace({ name: 'Cart' })
        } else {
          router.push('/')
        }
      }
    } catch (e) {
      console.error(e)
    }
  })
  return {
    email,
    name,
    password,
    emailBlur,
    nameBlur,
    passwordBlur,
    emailError,
    nameError,
    passwordError,
    isSubmitting,
    isTooManyAttempts,
    onSubmit
  }
}
