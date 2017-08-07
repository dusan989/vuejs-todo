<template>
  <div class="container">
    <app-header></app-header>
    <app-todos></app-todos>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import Todos from './components/Todos.vue';

  export default {
    name: 'app',
    components: {
      appHeader: Header,
      appFooter: Footer,
      appTodos: Todos
    }
  }
</script>

<style>
  .no-margin {
    margin: 0;
  }
</style>
