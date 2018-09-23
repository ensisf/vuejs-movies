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
  name: 'genres',
  components: {
    MoviesList
  },
  mixins: [PageMixin],
  computed: {
    genreId() {
      return this.$route.params.id
    }
  },
  watch: {
    // if genre change - update list
    genreId: function() {
      this.currentPage = 1
      this.resetMoviesList()
      this.getMovies()
    }
  },
  methods: {
    getMovies() {
      this.$store.dispatch('LOAD_MOVIES_BY_GENRE', {
        page: this.currentPage,
        with_genres: this.genreId
      })
    }
  }
}
</script>
<style lang="scss">
</style>
