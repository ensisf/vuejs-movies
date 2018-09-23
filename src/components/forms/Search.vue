<template lang="pug">
  .search(
    v-click-outside="resetQuery"
  )
    input.form-control.search__field(
      type="search"
      placeholder="Start typing..."
      @input="throttleRequest"
      v-model="query"
    )
    button.search__reset(
      v-if="query"
      type="button"
      @click="resetQuery"
    )
    .dropdown-menu.show.search__dropdown(
      v-if="searchResult"
    )
      ul.list-unstyled(
        v-if="hasResults"
      )
        li(
          v-for="movie in results"
          :key="movie.id"
        )
          router-link.dropdown-item(
            :to="'/movie/' + movie.id"
            @click.native="resetQuery"
          ) {{ movie.original_title }}
      .alert.alert-warning.search__alert(
        v-else
      ) Nothing found
</template>

<script>
export default {
  name: 'search',
  data: () => ({
    timeout: null,
    query: ''
  }),
  computed: {
    hasResults() {
      return this.searchResult ? this.searchResult.total_results > 0 : false
    },
    searchResult() {
      return this.$store.getters.GET_SEARCH_RESULT
    },
    results() {
      return this.searchResult ? this.searchResult.results : null
    }
  },
  methods: {
    // throttling request
    throttleRequest() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(this.getMovies, 200)
    },
    getMovies() {
      if (this.query !== '') {
        this.$store.dispatch('SEARCH_MOVIES', this.query)
      } else {
        this.resetQuery()
      }
    },
    resetQuery() {
      // awoid unnecessary events
      if (this.query !== '') {
        this.$store.commit('RESET_SEARCH', null)
      }
      this.query = ''
    }
  }
}
</script>

<style lang="scss">
$btn-width: 10;
.search {
  position: relative;
  &__alert {
    margin: 0 8px;
  }
  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow: auto;
    background-color: #fff;
  }
  &__field {
    padding-right: #{$btn-width + 10}px;
  }
  &__reset {
    position: absolute;
    right: 8px;
    top: 10px;
    background: none;
    padding: 5px;
    border: none;
    width: #{$btn-width + 10}px;
    height: #{$btn-width + 10}px;
    cursor: pointer;

    &:hover,
    &:focus {
      color: red;
    }

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      width: $btn-width * 1.41px;
      border-bottom: 1px solid currentColor;
      pointer-events: none;
    }

    &::after {
      right: 5px;
      transform-origin: 100% 0;
      transform: rotate(-45deg);
    }
    &::before {
      left: 5px;
      transform-origin: 0 0;
      transform: rotate(45deg);
    }
  }
}
</style>
