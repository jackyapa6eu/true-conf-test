<template>
  <div
    class="elevator-cab"
    v-bind:style="elevStyles"
    v-bind:class="{
      'elevator-cab_up': data.up,
      'elevator-cab_down': data.down,
      'elevator-cab_rest': data.rest
    }"
  >
    <div class="elevator-cab__panel">
      <img
        v-if="data.inMove"
        class="elevator-cab__direction"
        src="../../images/elevator-cab__arrow.png"
        v-bind:class="{ 'elevator-cab__direction_up': data.up }"
      />
      <span v-if="data.inMove" class="elevator-cab__destination">{{ data.tasks[0] + 1 }}</span>
    </div>

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
        transition: `transform ${elevatorSettings.speed}s linear`
      }
    }
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
    border: solid 1px gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-right: 10px;
    background: #525151;
  }
  .elevator-cab:last-child {
    margin-right: 0;
  }
  .elevator-cab_up {
    box-shadow: 0 3px 3px #450505;
  }
  .elevator-cab_down {
    box-shadow: 0 -3px 3px #450505;
  }
  .elevator-cab_rest {
    animation: restOpacity .8s ease infinite;
  }
  .elevator-cab__panel {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    height: 20px;
    background: #9b1313;
    box-shadow: 0 0 20px #9b1313;
    border: solid 2px #450505;
    box-sizing: border-box;
  }
  .elevator-cab__direction {
    height: 18px;
  }
  .elevator-cab_up .elevator-cab__direction {
    transform: rotate(180deg);
  }
  .elevator-cab__destination {
    font-size: 18px;
  }

  @keyframes restOpacity {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
</style>
