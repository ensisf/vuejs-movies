<template lang="pug">
  div
    .modal.fade(
      ref="modal"      
    )
      .modal-dialog
        .modal-content
          .modal-header
            ul.nav
              li.nav-item
                a.nav-link(
                  href="#"
                  :class="currentFrom == 'SignIn' ? 'active' : ''"
                  @click="showForm('SignIn')"
                ) Sign in
              li.nav-item
                a.nav-link(
                  href="#"
                  :class="currentFrom == 'SignUp' ? 'active' : ''"
                  @click="showForm('SignUp')"
                ) Sign up
            button.close(
              type="button"
              @click="toggleModal"
            )
              span &times;
          .modal-body
            component(
              :is="currentFrom"
              @closeModal="toggleModal"
            )
            
    .modal-backdrop.hid.fade(
      ref="backdrop"
      @click="toggleModal"
    )
</template>

<script>
import SignIn from '@/components/forms/SignIn'
import SignUp from '@/components/forms/SignUp'

export default {
  name: 'modal',
  components: {
    SignIn,
    SignUp
  },
  data: () => ({
    currentFrom: 'SignIn'
  }),
  computed: {
    modal() {
      return this.$refs.modal
    },
    backdrop() {
      return this.$refs.backdrop
    },
    modalHidden() {
      return this.$store.state.showModal
    }
  },
  watch: {
    modalHidden: function(val) {
      if (val) {
        this.showModal()
      } else {
        this.hideModal()
      }
    }
  },
  methods: {
    showForm(form) {
      this.currentFrom = form
    },
    toggleModal() {
      this.$store.commit('TOGGLE_MODAL')
    },
    showModal() {
      document.body.classList.add('modal-open')
      this.modal.style.display = 'block'
      this.backdrop.style.display = 'block'

      setTimeout(() => {
        this.modal.classList.add('show')
        this.backdrop.classList.add('show')
      }, 300)
    },
    hideModal() {
      this.modal.classList.remove('show')
      this.backdrop.classList.remove('show')

      setTimeout(() => {
        document.body.classList.remove('modal-open')
        this.modal.style.display = 'none'
        this.backdrop.style.display = 'none'
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-link {
  &:hover,
  &.active {
    background-color: #f6f6f6;
  }
}
.modal-backdrop {
  &.hid {
    display: none;
  }
}
.modal {
  pointer-events: none;
}
.modal-dialog {
  pointer-events: auto;
}
</style>
