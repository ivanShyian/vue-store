<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <form class="card" @submit.prevent="onSubmit">
      <h3 class="text-center">Login please</h3>
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
import TheNavbar from '@/components/TheNavbar'
import { useLoginForm } from '@/use/login'

export default {
  setup() {
    return {
      ...useLoginForm()
    }
  },
  components: { TheNavbar }
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
