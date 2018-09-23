<template lang="pug">
  .movies-box(
    ref="box"
  )
    MoviesList(
      :movies="movies"
    )
</template>

<script>
import MoviesList from '@/components/MoviesList'
import PageMixin from '@/mixins/movies-page-mixin'

export default {
  name: 'home',
  components: {
    MoviesList
  },
  mixins: [PageMixin],
  methods: {
    getMovies() {
      this.$store.dispatch('LOAD_MOVIES', {
        page: this.currentPage
      })
    }
  }
}
</script>
