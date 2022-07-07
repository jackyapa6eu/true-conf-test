<template>
  <div class="elevator-cab" v-bind:style="elevStyles">
    <span>level: {{ data.level }}</span>
    <span v-if="data.up">{{ 'UP' }}</span>
    <span v-if="data.down">{{ 'DOWN' }}</span>
    <span>{{ data.tasks }}</span>
  </div>
</template>

<script>
import {elevatorSettings} from "@/constants/constants";

export default {
  name: "ElevatorCab",
  computed: {
    elevStyles: function () {
      return {
        height: `${100 / this.levelsCount}%`,
        transform: `translateY(${-((this.data.level) * 100)}%)`,
        background: this.data.ready ? 'green' : 'red',
        transition: `transform ${elevatorSettings.speed}s linear`
      }
    }
  },
  mounted() {
    console.log(this.data);
  },
  props: {
    data: {
      rest: Boolean,
      inMove: Boolean,
      ready: Boolean,
      level: Number,
      tasks: Array,
      up: Boolean,
      down: Boolean
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
    flex-direction: column;
    box-sizing: border-box;
    margin-right: 10px;
  }
  .elevator-cab:last-child {
    margin-right: 0;
  }
</style>
