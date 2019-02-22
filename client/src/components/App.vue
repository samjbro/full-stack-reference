<template>
  <div class="app">
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

