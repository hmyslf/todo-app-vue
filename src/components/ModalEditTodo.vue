<template>
  <v-dialog
  v-model="dialog"
  max-width="500px"
  >
  <v-card>
    <v-card-text>
      <v-form @submit.prevent="submitEdit" class="mt-3">
        <v-text-field
        label="Title"
        type="text"
        v-model="localTodo.title"
        >
        </v-text-field>
        <v-text-field
        label="Description"
        v-model="localTodo.description"
        >
        </v-text-field>
        <v-select
          :items="status"
          item-text="name"
          item-value="name"
          label="Status"
          v-model="localTodo.status"
          outlined
        ></v-select>
        <v-btn
        class="primary"
        type="submit"
        >
        Edit
        </v-btn>
        <v-btn
        class="error ml-5"
        @click.prevent="closeModal"
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
  name: 'ModalEditTodo',
  props: ['dialog', 'todo'],
  data () {
    return {
      status: [
        {
          name: 'pending'
        },
        {
          name: 'done'
        }
      ]
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    submitEdit () {
      server.put(`/todos/${this.localTodo.id}`, {
        title: this.localTodo.title,
        description: this.localTodo.description,
        status: this.localTodo.status,
        due_date: this.localTodo.due_date
      }, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getTodos')
          this.$store.commit('SET_SUCCESS', 'Berhasil Mengubah Todo')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
          if (data.Todo[0].status === 'done') {
            this.$notification.show('Todo Selesai', {
              body: `Sukses Mengubah Todo ${data.Todo[0].title} menjadi Selesai!`
            }, {})
          }
          this.$emit('closeModal')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    localTodo () {
      return { ...this.todo }
    }
  }
}
</script>

<style>

</style>
