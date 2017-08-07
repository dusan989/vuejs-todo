<template>
  <div class="row">
    <div class="col-xs-12 text-center">
      <p>Todos left: {{ activeCount }}</p>
    </div>
    <div class="col-xs-12">
      <div class="btn-group btn-group-justified">
        <div class="btn-group">
          <button type="button" class="btn btn-default" @click="setVisibility('ALL')" :class="{ active: visibility === 'ALL' }">All</button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default" @click="setVisibility('ACTIVE')" :class="{ active: visibility === 'ACTIVE' }">Active</button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default" @click="setVisibility('COMPLETED')" :class="{ active: visibility === 'COMPLETED' }">Completed</button>
        </div>
      </div>
    </div>
    <div class="col-xs-12" style="margin-top: 10px;">
      <div class="btn-group btn-group-justified">
        <div class="btn-group">
          <button class="btn btn-default btn-block" @click="markAllCompleted">Mark all completed</button>
        </div>
        <div class="btn-group">
          <button class="btn btn-default btn-block" @click="clearCompleted" v-if="completedCount">Clear completed</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      activeCount: {
        required: true,
        type: Number
      },
      completedCount: {
        default: 0
      }
    },
    data() {
      return {
        visibility: 'ALL'
      }
    },
    methods: {
      setVisibility(visibility) {
        this.visibility = visibility;
        this.$emit('visibility', visibility);
      },
      clearCompleted() {
        this.$emit('clearCompleted');
      },
      markAllCompleted() {
        this.$emit('markAllCompleted');
      }
    }
  };
</script>

<style scoped>

</style>
