<template>
  <div class="row">
    <div class="col-xs-1">
      <input type="checkbox" v-model="todo.completed" @dbclick="allCompleted">
    </div>
    <div class="col-xs-8">
      <p class="no-margin" :class="{ 'strike-through': todo.completed }">{{ todo.title }}</p>
    </div>
    <div class="col-xs-3">
      <button class="pull-right btn btn-primary btn-xs" @click="remove(todo)"><i class="glyphicon glyphicon-remove"></i></button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['todo'],
    methods: {
      remove(todo) {
        this.$emit('removeTodo', todo);
      },
      allCompleted() {
        this.$emit('allCompleted');
      }
    }
  };
</script>

<style scoped>
  .strike-through {
    text-decoration: line-through;
  }
</style>
