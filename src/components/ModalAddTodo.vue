<template>
  <v-dialog
  v-model="dialogAdd"
  max-width="500px"
  >
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="addTodo">
          <v-text-field
          label="Title"
          type="text"
          v-model="title"
          >
          </v-text-field>
          <v-text-field
          label="Description"
          v-model="description"
          >
          </v-text-field>
          <v-select
            :items="statusSelect"
            item-text="name"
            item-value="name"
            label="Status"
            v-model="status"
            outlined
          ></v-select>
          <v-row justify="center">
            <h4>Due date</h4><br>
          </v-row>
          <v-row justify="center">
            <v-date-picker v-model="due_date" :allowed-dates="allowedDates"></v-date-picker>
          </v-row>
          <v-btn
          class="primary"
          type="submit"
          >
          Add
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
  name: 'ModalAddTodo',
  props: ['dialogAdd'],
  data () {
    return {
      title: '',
      description: '',
      status: '',
      due_date: '',
      statusSelect: [
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
    addTodo () {
      server.post('/todos', {
        title: this.title,
        description: this.description,
        status: this.status,
        due_date: this.due_date
      }, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getTodos')
          this.$store.commit('SET_SUCCESS', 'Berhasil Menambahkan Todo')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
          this.$emit('closeModalAdd')
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeModalAdd () {
      this.$emit('closeModalAdd')
    },
    allowedDates (val) {
      const date = new Date(val)
      const today = new Date()
      if (date >= today) {
        return val
      }
    }
  }
}
</script>

<style>

</style>
