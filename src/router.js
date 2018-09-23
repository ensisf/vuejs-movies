import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Store from '@/store'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/views/Movie.vue')
    },
    {
      path: '/genres/:id',
      name: 'genres',
      component: () => import('@/views/Genres.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('@/views/Favourites.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // check if route protected
  if (to.matched.some(record => record.meta.requiresAuth) && Store.getters.GET_USER === null) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
