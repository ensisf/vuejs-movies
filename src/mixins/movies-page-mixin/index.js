export default {
  data: () => ({
    loadTimeout: null,
    currentPage: 1
  }),
  computed: {
    movies() {
      return this.$store.getters.GET_MOVIES
    }
  },
  methods: {
    resetMoviesList() {
      this.$store.commit('RESET_MOVIES')
    },
    observeScroll() {
      // throttling request
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout)
      }

      this.loadTimeout = setTimeout(() => {
        if (
          // 150px left scroll to bottom
          this.$refs.box.getBoundingClientRect().bottom - 150 <
          document.documentElement.clientHeight
        ) {
          // next page
          this.currentPage = this.currentPage + 1
          this.getMovies()
        }
      }, 100)
    }
  },
  mounted() {
    this.getMovies()
    window.addEventListener('scroll', this.observeScroll)
  },
  beforeDestroy() {
    this.resetMoviesList()
    window.removeEventListener('scroll', this.observeScroll)
  }
}
