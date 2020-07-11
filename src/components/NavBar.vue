<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h3>Todos App</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="error ml-5"
        v-if="isLogin"
        @click.prevent="logout"
        >Logout</v-btn>
    </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push({ name: 'LandingPage' })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>

</style>
