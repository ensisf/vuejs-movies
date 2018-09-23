<template lang="pug">
  .movie(
    v-if="movie"
  )
    .row
      .col-sm-4
        img(
          :src="imageUrl + 'w500' + movie.poster_path"
        )
      .col-sm-8
        h1  {{ movie.title }}
        i {{ movie.tagline }}
        .movie__box(
            v-if="rating"
        )
          h5 Current rating
          Rating(
            :rating="rating"
          )
        .movie__box 
          h5 Production
          ul
            li(
              v-for="company in movie.production_companies" 
              :key="company.id"
            ) {{ company.name }}
        p
          b Relise date 
          span {{ movie.release_date }}
        h5 Overview
        p {{ movie.overview }}
    .movie__related(
      v-if="hasSimilar"
    )
      h2 Related movies
      MoviesList(
        :movies="similar"
      )
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import MoviesList from '@/components/MoviesList'
import Rating from '@/components/Rating'

export default {
  name: 'movie',
  components: {
    MoviesList,
    Rating
  },
  data: () => ({
    movie: null,
    similar: []
  }),
  computed: {
    rating() {
      return this.movie.vote_average
    },
    id() {
      return this.$route.params.id
    },
    url() {
      return `/movie/${this.id}`
    },
    hasSimilar() {
      return this.similar.length > 0
    },
    imageUrl() {
      return config.baseImageUrl
    }
  },
  watch: {
    id: 'loadData'
  },
  methods: {
    getMovie() {
      axios
        .get(this.url)
        .then(({ data }) => {
          this.movie = data
        })
        .catch(err => console.log(err))
    },
    getRelated() {
      axios
        .get(`${this.url}/similar`)
        .then(({ data }) => {
          this.similar = data.results
        })
        .catch(err => console.log(err))
    },
    loadData() {
      // document.documentElement.scrollTop = 0
      // reset old movie
      this.movie = null
      this.similar = []
      //
      this.getMovie()
      this.getRelated()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style lang="scss">
.movie {
  &__related {
    padding-top: 30px;
  }
  &__box {
    margin-bottom: 15px;
  }
}
</style>
