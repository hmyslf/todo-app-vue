<template>
  <v-dialog
  v-model="dialogDelete"
  max-width="500px"
  >
  <v-card>
    <v-card-text>
      <v-form @submit.prevent="submitDelete">
        <v-row>
          <h2 class="mt-2 mb-2">Delete Todo '{{todo.title}}' ? </h2>
        </v-row>
        <v-btn
        class="error"
        type="submit"
        >
        Delete
        </v-btn>
        <v-btn
        class="primary ml-5"
        @click.prevent="closeModalDelete"
        >
        Cancel
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
import server from '../api'

export default {
  name: 'ModalDeleteTodo',
  props: ['dialogDelete', 'todo'],
  methods: {
    closeModalDelete () {
      this.$emit('closeModalDelete')
    },
    submitDelete () {
      server.delete(`/todos/${this.todo.id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getTodos')
          this.$store.commit('SET_SUCCESS', 'Berhasil Menghapus Todo')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
          this.$emit('closeModalDelete')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
