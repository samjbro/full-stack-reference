<template>
  <div class="app">
    <div class="app__main" v-if="currentUser">
      <fa-icon :icon="['fas', 'user']" />
      {{ hello }}
      <router-link to="/one">One</router-link>
      <router-link to="/two">Two</router-link>
      <router-view />
    </div>
    <div class="app__login" v-else>
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from './auth/login-form.vue'
import { GET_CURRENT_USER, GET_ME, GET_HELLO_MESSAGE } from '@/apollo/operations'
export default {
  components: { LoginForm },
  data () {
    return {}
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
            await this.$apollo.mutate({
              mutation: SET_CURRENT_USER,
              variables: {
                user: data.me
              }
            })
          } catch (e) {
            console.error(e)
          }
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

