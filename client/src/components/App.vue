<template>
  <div class="app">
    <fa-icon :icon="['fas', 'user']" />
    {{ hello }}
    <router-link to="/one">One</router-link>
    <router-link to="/two">Two</router-link>
    <router-view />
  </div>
</template>

<script>
import { GET_HELLO_MESSAGE } from '../operations'
export default {
  apollo: {
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

