<template lang="pug">
  #app
    .container
      .text-right(
        v-if="!loggedIn"
      )
        button.btn.btn-primary.mb-2(
          type="button"
          @click="openModal"
        ) Sign in
      Modal
      header.header.navbar.navbar-light.bg-light               
          router-link.navbar-brand.header__logo(
            to="/"
          )
            img(
              src="/img/logo.png" 
              width="50" 
              height="50"
            )          
          Search.header__search
      router-view
    transition(
      name="fade"
    )
      FavLink(
        v-if="loggedIn"
      )
</template>
<script>
import { auth, db } from '@/services/firebase'
import Search from '@/components/forms/Search'
import FavLink from '@/components/FavLink'

export default {
  components: {
    Search,
    FavLink,
    Modal: () => import('@/components/modals/Modal')
  },
  computed: {
    userId() {
      return this.$store.getters.GET_USER
    },
    loggedIn() {
      return this.userId !== null
    }
  },
  methods: {
    openModal() {
      this.$store.commit('TOGGLE_MODAL')
    },
    observeFavourites() {
      db.ref(`users/${this.userId}/favourites`).on('value', snap => {
        const recivedValues = snap.val()

        // user have any movies in fav list
        if (!recivedValues) {
          this.$store.commit('SET_FAVOURITES', [])
          return
        }

        // make an array of favourites movies with their identifiers from firebase
        const favourites = Object.keys(recivedValues).reduce((prev, current) => {
          return [
            ...prev,
            {
              favId: current,
              movie: recivedValues[current]
            }
          ]
        }, [])

        this.$store.commit('SET_FAVOURITES', favourites)
      })
    }
  },
  mounted() {
    // get genres list
    this.$store.dispatch('LOAD_GENRES')

    // observe log-in/log-out change state
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        this.$store.commit('SET_USER', user.uid)

        // listen data change in firebase
        this.observeFavourites()
      } else {
        console.log('logged out')
        this.$store.commit('SET_USER', null)
      }
    })
  }
}
</script>

<style lang="scss">
#app {
  padding: 15px 0;
  color: #282828;
}
.header {
  flex-wrap: nowrap;
  margin-bottom: 15px;
  &__search {
    flex-grow: 1;
  }
}
</style>
