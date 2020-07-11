<template>
  <div class="home">
    <v-container>
      <v-row>
        <h1>Your Todos List</h1>
      </v-row>
      <v-row>
        <v-btn
        class="primary"
        type="submit"
        >
        Add Todo
        </v-btn>
      </v-row>
      <v-row align-center>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <th>No. </th>
              <th>Title </th>
              <th>Description </th>
              <th>Status </th>
              <th>Due Date </th>
              <th colspan="2">Action </th>
            </thead>
            <tbody>
              <tr v-for="todo in todos" :key="todo.id">
                <td>{{todo.id}}</td>
                <td>{{todo.title}}</td>
                <td>{{todo.description}}</td>
                <td>{{todo.status}}</td>
                <td>{{todo.due_date}}</td>
                <td>
                  <v-btn
                  class="primary"
                  @click.prevent="editTodo(todo)"
                  >Edit</v-btn>
                </td>
                <td>
                  <v-btn
                  class="error"
                  @click.prevent="deleteTodo"
                  >Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
      <ModalEditTodo
        :dialog="dialog"
        :todo="todo"
        @closeModal="closeModal"
      />
    </v-container>
  </div>
</template>

<script>
import ModalEditTodo from '../components/ModalEditTodo.vue'

export default {
  name: 'Home',
  components: {
    ModalEditTodo
  },
  data () {
    return {
      dialog: false,
      todo: {}
    }
  },
  methods: {
    editTodo (todo) {
      this.dialog = true
      this.todo = todo
    },
    closeModal () {
      this.dialog = false
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('getTodos')
      this.$store.commit('SET_LOGIN', true)
    } else {
      this.$router.push({ name: 'LandingPage' })
    }

    if (this.successMessage) {
      setTimeout(() => {
        this.$store.commit('SET_SUCCESS', '')
      }, 4000)
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    }
  }
}
</script>
