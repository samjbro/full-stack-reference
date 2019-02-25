<template>
  <div class="app">
    <div class="app__main" v-if="currentUser">
      <fa-icon :icon="['fas', 'user']" />
      {{ hello }}
      <router-link to="/one">One</router-link>
      <router-link to="/two">Two</router-link>
      <router-view />
      Wait for JWT to expire, then click this button to test auto-logout upon JWT expiration <br> 
      (nb: if you click before expiration the result will be cached an no logout will occur) <br>
      <button @click="testQuery">Fire Query</button>
    </div>
    <div class="app__login" v-else>
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from './auth/login-form.vue'
import { GET_CURRENT_USER, GET_ME, GET_HELLO_MESSAGE, SET_CURRENT_USER } from '@/apollo/operations'
export default {
  components: { LoginForm },
  data () {
    return {}
  },
  methods: {
    async testQuery () {
      try {

        const { data } = await this.$apollo.query({ query: GET_ME })
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  apollo: {
    currentUser () {
      return {
        query: GET_CURRENT_USER
      }
    },
    me () {
      return {
        query: GET_ME,
        async result ({ data }) {
          if (!data.me) return
          try {
            const thing = await this.$apollo.mutate({
              mutation: SET_CURRENT_USER,
              variables: {
                user: data.me
              }
            }).catch(e => {
              console.log('LOLL')
            })
          } catch (e) {
            console.log(e)
          }
        },
        error: e => {
          console.log(e)
        }
      }
    },
    hello () {
      return {
        query: GET_HELLO_MESSAGE
      }
    }
  }
}
</script>

<style lang="scss">
.app {
  color: red;
}
</style>

