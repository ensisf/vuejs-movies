<template lang="pug">
  .row.movies-list
    template(v-if="hasMovies")
      .col-xs-12.col-sm-6.col-lg-4.movies-list__item(
        v-for="movie in movies"
        :key="movie.id"
      ) 
        MovieCard(
          :movie="movie"
        )
</template>

<script>
import MovieCard from '@/components/MovieCard'

export default {
  name: 'movies-list',
  components: {
    MovieCard
  },
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasMovies() {
      return this.movies && this.movies.length > 0
    }
  }
}
</script>

<style lang="scss">
.movies-list {
  &__item {
    display: flex;
    margin-bottom: 30px;
  }
}
</style>
