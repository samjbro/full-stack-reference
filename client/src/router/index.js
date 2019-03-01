import Vue from 'vue'
import VueRouter from 'vue-router'

import LiveChat from '@/components/pages/live-chat.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: {
        render: h => h('h1', 'Home')
      }
    },
    {
      path: '/chat',
      component: {
        render: h => h(LiveChat)
      }
    }
  ]
})