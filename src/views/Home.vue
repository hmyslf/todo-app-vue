<template>
  <div class="home">
    <v-container>
      <v-row class="mt-2">
        <h1>Your Todos List</h1>
      </v-row>
      <v-row class="mt-2">
        <v-btn
        class="primary"
        @click.prevent="showModalAdd"
        >
        Add Todo
        </v-btn>
      </v-row>
      <v-row class="mt-2">
        <span v-if="errorMessage" class="red--text">{{ errorMessage }}</span>
        <span v-if="successMessage" class="green--text">{{ successMessage }}</span>
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
            <tbody v-if="todos.length">
              <tr v-for="(todo, index) in todos" :key="todo.id">
                <td>{{index+1}}</td>
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
                  @click.prevent="deleteTodo(todo)"
                  >Delete</v-btn>
                </td>
              </tr>
            </tbody>
            <tbody v-if="!todos.length">
              <tr>
                <td colspan="8">Belum Menambahkan Todo</td>
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
      <ModalAddTodo
        :dialogAdd="dialogAdd"
        @closeModalAdd="closeModalAdd"
      />
      <ModalDeleteTodo
        :dialogDelete="dialogDelete"
        :todo="todo"
        @closeModalDelete="closeModalDelete"
      />
    </v-container>
  </div>
</template>

<script>
import ModalEditTodo from '../components/ModalEditTodo.vue'
import ModalAddTodo from '../components/ModalAddTodo.vue'
import ModalDeleteTodo from '../components/ModalDeleteTodo.vue'

export default {
  name: 'Home',
  components: {
    ModalEditTodo,
    ModalAddTodo,
    ModalDeleteTodo
  },
  data () {
    return {
      dialog: false,
      todo: {},
      dialogAdd: false,
      dialogDelete: false
    }
  },
  methods: {
    editTodo (todo) {
      this.dialog = true
      this.todo = todo
    },
    deleteTodo (todo) {
      this.dialogDelete = true
      this.todo = todo
    },
    closeModal () {
      this.dialog = false
    },
    showModalAdd () {
      this.dialogAdd = true
    },
    closeModalAdd () {
      this.dialogAdd = false
    },
    closeModalDelete () {
      this.dialogDelete = false
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
    },
    successMessage () {
      return this.$store.state.successMessage
    },
    errorMessage () {
      return this.$store.state.errorMessage
    }
  }
}
</script>
