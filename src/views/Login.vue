<template>
  <app-loading v-if="loading"></app-loading>
  <div class="container with-nav" v-else>
    <form class="card" @submit.prevent="onSubmit">
      <h3 class="text-center">Вход в систему</h3>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email"
               id="email"
               autocomplete
               v-model="email"
               @blur="emailBlur">
        <small v-if="emailError">{{ emailError }}</small>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password"
               autocomplete
               v-model="password"
               @blur="passwordBlur">
        <small v-if="passwordError">{{ passwordError }}</small>
      </div>
      <button class="btn primary"
              type="submit"
              :disabled="isSubmitting || isTooManyAttempts"
      >Login
      </button>
      <span class="text-danger" v-if="isTooManyAttempts">Слишком много попыток входа</span>
    </form>
  </div>
</template>

<script>
import { useLoginForm } from '@/use/login'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import AppLoading from '@/components/ui/AppLoading'

export default {
  components: { AppLoading },
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('alert/doAlert', {
        type: 'warning',
        text: 'Войдите в систему'
      })
    }
    return {
      ...useLoginForm()
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

</style>
