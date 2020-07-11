<template>
  <v-dialog
  v-model="dialog"
  max-width="500px"
  >
  <v-card>
    <v-card-text>
      <v-form @submit.prevent="submitEdit">
        {{this.todo.status}}
        <v-text-field
        label="Title"
        type="text"
        v-model="todo.title"
        >
        </v-text-field>
        <v-text-field
        label="Description"
        v-model="todo.description"
        >
        </v-text-field>
        <v-select
          :items="status"
          item-text="name"
          item-value="name"
          label="Status"
          v-model="defaultSelected"
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
      defaultSelected: this.todo.status,
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
      this.$emit('closeModal', false)
    },
    submitEdit () {
      server.put(`/todos/${this.todo.id}`, {
        title: this.todo.title,
        description: this.todo.description,
        status: this.defaultSelected,
        due_date: this.todo.due_date
      }, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getTodos')
          if (data.Todo[0].status === 'done') {
            this.$notification.show('Todo Selesai', {
              body: `Sukses Mengubah Todo ${data.Todo[0].title} menjadi Selesai!`
            }, {})
          }
          this.$emit('closeModal', false)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    setTimeout(() => {
      this.defaultSelected = this.todo.status
    }, 1000)
  }
}
</script>

<style>

</style>
