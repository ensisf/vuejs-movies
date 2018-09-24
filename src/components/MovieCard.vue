<template lang="pug">
  .card.movie-card
    FavListBtn.movie-card__fav-btn(
      :inFavList="isInFavList"
      :movieId="movie.id"
      @toggleFavMovie="toggleInFavList"
    )
    img.card-img-top.movie-card__image(
      :src="imageUrl + '/w400/' + movie.poster_path"
    )
    .card-body.movie-card__body
      h5.card-title.movie-card__title
        router-link(
          :to="'/movie/' + movie.id"
        ) {{ movie.title }}
      i.movie-card__release Release date: 
        b {{ movie.release_date }}
      p.card-text {{ excerpt }}
      p.genres
        router-link(
          v-for="genre, idx in genres"
          :to="'/genres/' + genre.id"
          :key="genre.id"
        ) 
          i {{ genre.name }}{{ ((idx + 1) == genres.length) ? '' : ', ' }}
      router-link.btn.btn-info(
        :to="'/movie/' + movie.id"
      ) Read more 
        
</template>

<script>
import config from '@/config'
import FavListBtn from '@/components/FavListBtn'
import { db } from '@/services/firebase'

export default {
  name: 'movie-card',
  components: {
    FavListBtn
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    fav() {
      return this.$store.getters.GET_FAVOURITES.find(el => {
        return el.movie.id === this.movie.id
      })
    },
    isInFavList() {
      return this.fav !== undefined
    },
    imageUrl() {
      return config.baseImageUrl
    },
    excerpt() {
      return `${this.movie.overview.slice(0, 138)}...`
    },
    genres() {
      return this.$store.getters.GET_GENRES.filter(
        genre => this.movie.genre_ids.indexOf(genre.id) !== -1
      )
    },
    userId() {
      return this.$store.getters.GET_USER
    }
  },
  methods: {
    toggleInFavList() {
      if (this.isInFavList) {
        db.ref(`users/${this.userId}/favourites/${this.fav.favId}`).remove()
      } else {
        db.ref(`users/${this.userId}/favourites`).push(this.movie)
      }
    }
  }
}
</script>

<style lang="scss">
.movie-card {
  position: relative;
  display: flex;
  flex-direction: column;

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__fav-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 5;
  }

  &__release{
    display: block;
    padding: 10px 0;
  }

  &__title {
    margin-bottom: auto;
    &:hover {
      a {
        text-decoration: none;
      }
    }
  }

  &__image {
    display: block;
  }
}
</style>
