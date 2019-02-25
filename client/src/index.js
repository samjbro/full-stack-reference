import Vue from 'vue'

import router from './router'
import apolloProvider from './apollo'
import './font-awesome'
import '#/main.scss'
import App from './components/App'

new Vue({
  router,
  apolloProvider,
  el: '#root',
  render: h => h(App)
})