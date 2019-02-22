import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/one',
      component: {
        render: h => h('h1', 'One')
      }
    },
    {
      path: '/two',
      component: {
        render: h => h('h1', 'Two')
      }
    }
  ]
})