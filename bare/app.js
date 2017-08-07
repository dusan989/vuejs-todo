new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [],
    visibility: 'ALL'
  },
  created: function() {
    this.todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
  },
  watch: {
    todos: {
      deep: true,
      handler: function(todos) {
        window.localStorage.setItem('todos', JSON.stringify(todos));
      }
    }
  },
  computed: {
    activeCount: function() {
      return this.activeTodos.length;
    },
    completedCount: function() {
      return this.todos.length - this.activeCount;
    },
    activeTodos: function() {
      return this.todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    filteredTodos: function() {
      switch (this.visibility) {
        case 'COMPLETED':
          return this.todos.filter(function (todo) {
            return todo.completed;
          });
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
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();

      if (value) {
        this.todos.push({
          title: value,
          completed: false
        });

        this.newTodo = '';
      }
    },
    removeTodo: function(index) {
      this.todos.splice(index, 1);
    },
    setVisibility: function(visibility) {
      this.visibility = visibility;
    },
    clearCompleted: function() {
      this.todos = this.activeTodos;
    },
    markAllCompleted: function() {
      this.todos.map(function(todo) {
        todo.completed = true;
        return todo;
      });
    }
  }
});
