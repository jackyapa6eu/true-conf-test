<template>
  <div class="elevator-cab" v-bind:style="elevStyles">
    <span>level: {{ data.level }}</span>
    <span>RESTING? {{ data.rest }}</span>
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
  computed: {
    elevStyles: function () {
      return {
        height: `${100 / this.levelsCount}%`,
        transform: `translateY(${-((this.data.level - 1) * 100)}%)`,
        background: this.data.ready ? 'green' : 'red'
      }
    }
  },
  props: {
    data: {
      rest: Boolean,
      inMove: Boolean,
      ready: Boolean,
      level: Number,
      tasks: Array
    },
    levelsCount: Number
  }
}
</script>

<style scoped>
  .elevator-cab {
    width: 120px;
    border: solid 2px black;
    display: flex;
    box-sizing: border-box;
    transition: transform 1s ease;
  }
</style>
