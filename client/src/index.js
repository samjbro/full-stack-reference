import Vue from 'vue'

import App from './components/App'
import router from './router'
import './config/font-awesome'
import '#/main.scss'

new Vue({
  router,
  el: '#root',
  render: h => h(App)
})