<template>
  <div class="app">
    <div class="app__main" v-if="currentUser">
      <div class="app__nav">
        <div class="app__links">
          <router-link to="/" class="app__link">Home</router-link>
          <router-link to="/chat" class="app__link">Live Chat</router-link>
          <a href="#" class="app__link" @click="logout">Logout</a>
        </div>
        <div class="app__user">     
          <fa-icon :icon="['fas', 'user']" />
          Hello, {{ currentUser.name }}
          
        </div>
      </div>
      <router-view />
    </div>
    <div class="app__login" v-else>
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from './auth/login-form.vue'
import { apolloClient } from '@/apollo'
import { GET_CURRENT_USER, GET_ME, GET_HELLO_MESSAGE, SET_CURRENT_USER } from '@/apollo/operations'
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
            const thing = await this.$apollo.mutate({
              mutation: SET_CURRENT_USER,
              variables: {
                user: data.me
              }
            }).catch(e => {
              console.log(e)
            })
          } catch (e) {
            console.log(e)
          }
        },
        error: e => {
          console.log(e)
        }
      }
    }
  },
  methods: {
    logout () {
      apolloClient.resetStore()
      localStorage.clear()
    }
  }
}
</script>

<style lang="scss">
@import "~#/abstracts/mixins";
.app {
  &__main,
  &__login {
    height: 100vh;
    margin: 2rem;
  }
  &__login {
    @include vertical-center();
  }
  &__nav {
    display: flex;
    justify-content: space-between;
  }
  &__link {
    font-size: 2.5rem;
    padding: 1rem;
    &:not(:last-child) {
      border-right: 1px solid black;
    }
    color: black;
    &:hover {
      color: orangered;
    }
  }
  &__user {
    font-size: 1.8rem;
  }
}
</style>

