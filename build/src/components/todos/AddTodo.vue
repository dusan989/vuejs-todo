<template>
  <div class="form-group">
    <input
        autofocus
        autocomplete="off"
        type="text"
        class="form-control input-lg"
        placeholder="What needs to be done?"
        v-model="todo"
        @keyup.enter="add">
    <span class="help-block">Hit enter to add new todo.</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        todo: ''
      };
    },
    methods: {
      add() {
        const value = this.todo && this.todo.trim();

        if (value) {
          this.$emit('todoAdded', this.todo);
          this.todo = '';
        }
      }
    }
  };
</script>

<style scoped>

</style>
