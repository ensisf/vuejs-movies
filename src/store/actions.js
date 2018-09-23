import axios from '@/plugins/axios'
import { auth } from '@/services/firebase'

export default {
  LOAD_MOVIES: ({ commit }, { page }) => {
    axios
      .get('/movie/popular', {
        params: {
          page
        }
      })
      .then(({ data }) => {
        commit('SET_MOVIES', data)
      })
      .catch(err => console.log(err))
  },
  LOAD_MOVIES_BY_GENRE: ({ commit }, { page, with_genres }) => {
    axios
      .get('/discover/movie', {
        params: {
          page,
          with_genres
        }
      })
      .then(({ data }) => {
        commit('SET_MOVIES', data)
      })
      .catch(err => console.log(err))
  },
  LOAD_GENRES: ({ commit }) => {
    axios
      .get('/genre/movie/list')
      .then(({ data }) => {
        commit('SET_GENRES', data.genres)
      })
      .catch(err => console.log(err))
  },
  SEARCH_MOVIES: ({ commit }, payload) => {
    axios
      .get('/search/movie', {
        params: {
          query: payload
        }
      })
      .then(({ data }) => commit('SET_SEARCH_RESULT', data))
      .catch(err => console.log(err))
  },
  // auth
  SIGN_USER_UP: ({ commit }, { email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        commit('SET_USER', {
          id: user.uid
        })
      })
      .catch(err => alert(err.message))
  },
  SIGN_USER_IN: ({ commit }, { email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        commit('SET_USER', {
          id: user.uid
        })
      })
      .catch(err => alert(err.message))
  }
  // auth end
}
