<template lang="pug">
  div 
    MoviesList(
      v-if="hasMovies"
      :movies="movies"
    )
    .alert.alert-danger(
      v-else
    ) You can add movies to you favourite list 
      router-link(
        to="/"
      ) here
</template>

<script>
import MoviesList from '@/components/MoviesList'

export default {
  name: 'favourites',
  components: {
    MoviesList
  },
  computed: {
    movies() {
      return this.$store.getters.GET_FAVOURITES.reduce((prev, current) => {
        return [...prev, current.movie]
      }, [])
    },
    hasMovies() {
      return this.movies.length > 0
    }
  }
}
</script>
