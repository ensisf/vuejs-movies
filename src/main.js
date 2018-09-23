import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.use(vClickOutside)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
