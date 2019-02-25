<template>
  <form @submit.prevent="login">
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
      password: 'valid1234'
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
        console.log(data.login.user)
        await this.$apollo.mutate({
          mutation: SET_CURRENT_USER,
          variables: {
            user: data.login.user 
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>