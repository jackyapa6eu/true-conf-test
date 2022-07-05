<template>
  <div class="elevator-cab">
    <span>level: {{ data.level }}</span>
  </div>
</template>

<script>
export default {
  name: "ElevatorCab",
  data() {
    return {
      currentLevel: 1
    }
  },
  methods: {
    goTo(level) {
      console.log(level);
    }
  },
  props: {
    data: {
      rest: Boolean,
      inMove: Boolean,
      ready: Boolean,
      level: Number,
      tasks: Array
    }
  }
}
</script>

<style scoped>
  .elevator-cab {
    width: 90px;
    height: 150px;
    border: solid 2px black;
  }
</style>
