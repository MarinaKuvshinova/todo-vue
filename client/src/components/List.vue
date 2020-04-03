<template>
  <div class="hello">
    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO List App</h1>
          <form @submit.prevent="addNewTask" class="container">
            <div class="form-group row">
              <input type="text" v-model="taskname" class="form-control col col-9" placeholder="Add New Task">
              <button v-if="isEdit == false" class="btn btn-success btn-block col col-3">Submit</button>
              <button type="button" v-else class="btn btn-info btn-block col col-3" @click="updateTask">Update</button>
            </div>
          </form>

          <table class="table table-striped table-dark">
            <tr v-for="todo in todos" :key="todo.id" :title="todo.title">
                <td class="text-left">{{todo.title}}</td>
                <td class="text-right">
                  <button @click="editTask(todo.title, todo._id)" class="btn text-info"><i class="fas fa-pencil-alt"></i></button>
                  <button @click="deleteTask(todo._id)" class="btn text-danger"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'List',
  data () {
    return {
      todos: [],
      id: '',
      taskname: '',
      isEdit: false
    }
  },
  mounted () {
    this.getTask()
  },
  methods: {
    getTask () {
      axios.get('/api/tasks').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.log(error)
        }
      )
    },
    addNewTask () {
      axios.post('/api/tasks', { title: this.taskname }).then(
        result => {
          this.taskname = ''
          this.getTask()
          console.log(result)
        }).catch((error) => {
        console.log(error)
      })
    },
    editTask (title, id) {
      this.id = id
      this.taskname = title
      this.isEdit = true
    },
    updateTask () {
      axios.put(`/api/task/${this.id}`, {title: this.taskname})
        .then(res => {
          this.taskname = ''
          this.isEdit = false
          this.getTask()
          console.log(res)
        }).catch(error => { console.log(error) })
    },
    deleteTask (id) {
      axios.delete(`/api/task/${id}`)
        .then(res => {
          this.taskname = ''
          this.getTask()
          console.log(res)
        }).catch(error => { console.log(error) })
    }
  }
}
</script>

<style scoped>
    input[type="text"]{
      border-radius: 5px 0 0 5px;
    }
  form button{
    border-radius: 0 5px 5px 0;
  }
  .btn-success{
    background: #34495E;
    border-color: #34495E;
  }
  .btn-info {
    background: #41B883;
    border-color: #41B883;
  }
  .text-info {
      color: #41B883 !important;
    }
  .table-dark{
    border-radius: 5px;
    background: #34495E;
  }
  .table td {
      vertical-align: middle;
      border-top: 1px solid rgba(255,255,255,0.5);
    }
  .table-dark.table-striped tr:nth-of-type(odd) {
    background-color: rgba(255,255,255,.05);
  }
  table button{
    font-size: 20px;
  }
</style>
