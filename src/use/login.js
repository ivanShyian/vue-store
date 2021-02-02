import { useField, useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm() {
  const PASSWORD_LENGTH = 6
  const store = useStore()
  const router = useRouter()
  const { submitCount, isSubmitting, handleSubmit } = useForm()
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
      await store.dispatch('auth/login', values)
      await router.push('/')
    } catch (e) {}
  })
  return {
    email,
    password,
    emailBlur,
    passwordBlur,
    emailError,
    passwordError,
    isSubmitting,
    isTooManyAttempts,
    onSubmit
  }
}
