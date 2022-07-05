<template>
  <span>elevators count: {{ elevators.length }}</span>
  <span>levels: {{ levels }}</span>
  <div class="elevators">
    <ElevatorContainer v-for="(data, index) in elevators" v-bind:key="index" v-bind:data="data"/>
  </div>
  <button type="button" v-on:click="() => handleBtnClick(n)" v-for="n in levels" v-bind:key="n">Click {{ n }}</button>
</template>

<script>
import ElevatorContainer from "@/components/ElevatorContainer";

export default {
  name: 'App',
  components: { ElevatorContainer },
  data() {
    return {
      elevators: [],
      levels: 5
    }
  },
  mounted() {
    this.elevators = this.makeElevators(3);
  },
  methods: {
    handleBtnClick(destLevel) {
      console.log(destLevel);
    },
    makeElevators(count) {
      const resultArr = [];
      for (let i = 0; i < count; i++) {
        resultArr.push({
          rest: false,
          inMove: false,
          ready: true,
          level: 1,
          tasks: []
        });
      }
      return resultArr
    }
  }
}
</script>

<style>
  .elevators {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 60%;
    min-height: 70vh;
    border: solid 1px black;
  }
</style>
