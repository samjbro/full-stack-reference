<template>
  <div class="app">
    <fa-icon :icon="['fas', 'user']" />
    Hello World!!
    <router-link to="/one">One</router-link>
    <router-link to="/two">Two</router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
.app {
  color: red;
}
</style>

