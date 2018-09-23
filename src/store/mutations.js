export default {
  SET_SEARCH_RESULT: (state, payload) => (state.searchResult = payload),
  RESET_SEARCH: (state, payload) => (state.searchResult = payload),
  RESET_MOVIES: state => (state.movies = []),
  SET_MOVIES: (state, payload) => {
    state.movies.push(...payload.results)
  },
  SET_FAVOURITES: (state, payload) => (state.favourites = payload),
  SET_USER: (state, payload) => (state.userId = payload),
  TOGGLE_MODAL: state => (state.showModal = !state.showModal),
  SET_GENRES: (state, payload) => (state.genres = payload)
}
