import Vue from 'vue'

import App from './components/App'

import router from './router'

new Vue({
  router,
  el: '#root',
  render: h => h(App)
})