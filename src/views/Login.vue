<template>
  <app-loading v-if="loading"></app-loading>
  <div class="login-form container with-nav" v-else>
    <form class="card" @submit.prevent="onSubmit">
      <h3 class="text-center"
      >{{ register ? 'Регистрация в системе' : 'Вход в систему' }}</h3>
      <div class="form-control" v-if="register">
        <label for="name" style="text-align: left"
        >Введите ваше имя</label>
        <input type="text"
               id="name"
               autocomplete
               v-model="name"
               @blur="nameBlur">
        <small v-if="nameError">{{ nameError }}</small>
      </div>
      <div class="form-control">
        <label for="email" style="text-align: left"
        >Введите ваш email</label>
        <input type="email"
               id="email"
               autocomplete
               v-model="email"
               @blur="emailBlur">
        <small v-if="emailError">{{ emailError }}</small>
      </div>
      <div class="form-control">
        <label for="password" style="text-align: left"
        >{{ register ? 'Придумайте пароль' : 'Введите ваш пароль' }}</label>
        <input type="password" id="password"
               autocomplete
               v-model="password"
               @blur="passwordBlur">
        <small v-if="passwordError">{{ passwordError }}</small>
      </div>
      <button class="btn primary"
              type="submit"
              :disabled="isSubmitting || isTooManyAttempts"
      >{{ register ? 'Зарегестрироваться' : 'Войти' }}
      </button>
      <span class="text-danger" v-if="isTooManyAttempts">Слишком много попыток входа</span>
      <div v-if="!register" class="register-sentence">
        <hr style="margin: .5rem 0"/>
        <span>Или</span><a href="#" @click.prevent="register = true"> зарегестрироваться</a><span> в системе</span>
      </div>
    </form>
  </div>
</template>

<script>
import { useLoginForm } from '@/use/login'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import AppLoading from '@/components/ui/AppLoading'
import { ref } from 'vue'

export default {
  components: { AppLoading },
  props: {
    cart: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const register = ref(false)

    if (route.query.message) {
      store.dispatch('alert/doAlert', {
        type: 'warning',
        text: 'Войдите в систему'
      })
    }
    return {
      ...useLoginForm(props.cart, register),
      register
    }
  }
}
</script>

<style scoped lang="scss">
div.container {
  form.card {
    margin: 0 auto;
    max-width: 500px;

    h3 {
      margin: 0 0 1rem 0;
      padding: 0 0 .5rem 0;
      border-bottom: 2px solid rgba(0, 0, 0, .1);
    }

    button.btn {
      width: 100%;
    }
  }
}
.register-sentence {
}
</style>
