<template lang="pug">
  form(
    @submit.prevent="signIn"
  )
    .form-group
      input.form-control(
        type="email"
        required
        v-model="email"
      )
    .form-group
      input.form-control(
        type="password"
        required
        v-model="password"
      )
    .form-group
      button.btn.btn-primary Sign in
</template>

<script>
export default {
  name: 'sign-in',
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    user() {
      return this.$store.getters.GET_USER
    }
  },
  watch: {
    user: 'hideSigneInForm'
  },
  methods: {
    signIn() {
      this.$store.dispatch('SIGN_USER_IN', {
        email: this.email,
        password: this.password
      })
    },
    hideSigneInForm() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>
</style>
