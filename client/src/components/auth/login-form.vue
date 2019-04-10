<template>
  <form class="login-form" @submit.prevent="login" :class="{ 'login-form--error': failed }">
    <!-- <div class="login-form__logo"> -->
      <!-- <img src="~img/logo.svg" alt="Logo"> -->
    <!-- </div> -->
    <input v-model="email" type="email" placeholder="Email Address" autofocus required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Log In</button>
  </form>
</template>

<script>
import { LOGIN, SET_CURRENT_USER } from '@/apollo/operations'
export default {
  data () {
    return {
      email: 'test@email.com',
      password: 'valid1234',
      failed: false
    }
  },
  methods: {
    async login () {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: { 
            data: {
              email: this.email,
            password: this.password
            }
          }
        })
        localStorage.setItem('token', data.login.token)
        await this.$apollo.mutate({
          mutation: SET_CURRENT_USER,
          variables: {
            user: data.login.user
          }
        })
        this.password = ''
      } catch (e) {
        this.failed = true
        setTimeout(() => {
          this.failed = false
        }, 2000);
      }
    }
  }
}
</script>

<style lang="scss">
@import "~#/abstracts/animations";
@import "~#/abstracts/variables";

.login-form {
  width: 28rem;
  padding: 2rem;
  background: rgba(255, 255, 255, .08);
  border: 1px solid #333;
  border-radius: .8rem;

  &--error {
    border-color: $colorError;
    animation: shake .5s;
  }

  &__logo {
    text-align: center;
    img {
      width: 15.6rem;      
    }
  }

  input,
  button {
    display: block;
    margin-top: 1.2rem;
    width: 100%;
  }
}
</style>


