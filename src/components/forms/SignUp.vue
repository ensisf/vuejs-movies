<template lang="pug">
  form(
    @submit.prevent="signUp"
  )
    .form-group
      label(for="sign-up-email") Email*
      input.form-control#sign-up-email(
        type="email"
        v-model="email"
        required
      )
    .form-group
      label(for="sign-up-pass") Password*
      input.form-control#sign-up-pass(
        type="password"
        v-model.lazy="password"
        required
      )
      small.form-text.text-danger(
        v-if="!passwordsEqual"
      ) Passwords should be equal
    .form-group
      label(for="confirm-pass") Confirm password*
      input.form-control#confirm-pass(
        type="password"
        v-model.lazy="confirmPassword"
        required
      )
      small.form-text.text-danger(
        v-if="!passwordsEqual"
      ) Passwords should be equal
    .form-group
      button.btn.btn-primary Sign up
</template>

<script>
export default {
  name: 'sign-up',
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    passwordsEqual: true
  }),
  computed: {
    user() {
      return this.$store.getters.GET_USER
    }
  },
  watch: {
    user: 'hideSigneUpForm'
  },
  methods: {
    signUp() {
      this.validatePasswords()

      if (!this.passwordsEqual) return

      this.$store.dispatch('SIGN_USER_UP', {
        email: this.email,
        password: this.password
      })
    },
    validatePasswords() {
      this.password !== this.confirmPassword
        ? (this.passwordsEqual = false)
        : (this.passwordsEqual = true)
    },
    resetData() {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.passwordsEqual = true
    },
    hideSigneUpForm() {
      this.$emit('closeModal')
    }
  }
}
</script>
