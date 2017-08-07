<template>
  <main>
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
        <app-add-todo @todoAdded="addTodo"></app-add-todo>
      </div>
    </div>
    <div class="row todo-list-container">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
        <transition name="fade" mode="out-in">
          <div class="panel panel-default" v-if="todos.length" key="list">
            <ul class="list-group">
              <li class="list-group-item" v-for="todo in filteredTodos">
                <app-todo-item :todo="todo" @removeTodo="removeTodo" @allCompleted="allCompleted"></app-todo-item>
              </li>
            </ul>
            <div class="panel-footer">
              <app-todo-tools
                  :activeCount="activeCount"
                  :completedCount="completedCount"
                  @visibility="visibility = $event"
                  @clearCompleted="clearCompleted"
                  @markAllCompleted="allCompleted">
              </app-todo-tools>
            </div>
          </div>
          <div class="well" v-else key="message">
            <p class="no-margin">Please add TODOs to see them.</p>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
  import AddTodo from './todos/AddTodo.vue';
  import TodoItem from './todos/TodoItem.vue';
  import TodoTools from './todos/TodoTools.vue';

  export default {
    components: {
      appAddTodo: AddTodo,
      appTodoItem: TodoItem,
      appTodoTools: TodoTools
    },
    data() {
      return {
        todos: [],
        visibility: 'ALL'
      }
    },
    created() {
      this.todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
    },
    watch: {
      todos: {
        deep: true,
        handler(todos) {
          window.localStorage.setItem('todos', JSON.stringify(todos));
        }
      }
    },
    computed: {
      activeCount() {
        return this.activeTodos.length;
      },
      completedCount() {
        return this.todos.length - this.activeCount;
      },
      activeTodos() {
        return this.todos.filter(todo => !todo.completed);
      },
      filteredTodos() {
        switch (this.visibility) {
          case 'COMPLETED':
            return this.todos.filter(todo => todo.completed);
            break;
          case 'ACTIVE':
            return this.activeTodos;
            break;
          default:
            return this.todos;
        }
      }
    },
    methods: {
      addTodo(value) {
        this.todos.push({
          title: value,
          completed: false
        });
      },
      removeTodo(todo) {
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      },
      clearCompleted() {
        this.todos = this.activeTodos;
      },
      allCompleted() {
        this.todos.map((todo) => {
          todo.completed = true;
          return todo;
        });
      }
    }
  };
</script>

<style scoped>
  .todo-list-container {
    margin-top: 20px;
  }

  .fade-enter-active {
    animation: fade-in .5s;
  }

  .fade-leave-active {
    animation: fade-out .5s;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
