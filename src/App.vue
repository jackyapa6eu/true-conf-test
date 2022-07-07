<template>
  <span>elevators count: {{ elevators.length }}</span>
  <span>levels: {{ levels }}</span>
  <div class="main-content">
    <div class="elevators">
      <ElevatorContainer
        v-for="(data, index) in elevators"
        v-bind:key="index"
        v-bind:data="data"
        v-bind:levelsCount="levels"
      />
    </div>
    <div class="buttons">
      <button type="button" v-on:click="() => handleBtnClick(n)" v-for="n in levels" v-bind:key="n">Click {{ n }}</button>
    </div>
  </div>
</template>

<script>
import ElevatorContainer from "@/components/ElevatorContainer";

export default {
  name: 'App',
  components: { ElevatorContainer },
  data() {
    return {
      elevators: [],
      levels: 8
    }
  },
  mounted() {
    this.elevators = this.makeElevators(3);
  },
  methods: {
    handleBtnClick(destLevel) {
      this.findElevator(destLevel);
    },
    makeElevators(count) {
      const resultArr = [];
      for (let i = 0; i < count; i++) {
        resultArr.push({
          id: i + 1,
          rest: false,
          inMove: false,
          ready: true,
          level: 1,
          tasks: []
        });
      }
      return resultArr
    },

    findElevator(destLevel) {
      const freeElevators = this.elevators.filter(elev => elev.ready); // найдем все свободные лифты
      if (freeElevators.find(elev => elev.level === destLevel)) {
        console.log('Лифт уже на этом этаже');
        return
      }
      const closestElevator = this.findClosestElevator(freeElevators, destLevel);
      this.moveElevator(closestElevator, destLevel);
      //x.tasks.push(destLevel);
      //closestElevator.level = destLevel;
    },

    findClosestElevator(elevArr, destLevel) {
      const min = {
        diff: this.getDiff(elevArr, destLevel, 0),
        index: 0
      }
      for (let i = 1; i < elevArr.length; i++) {
        const diff = this.getDiff(elevArr, destLevel, i)
        if (diff < min.diff) {
          min.diff = diff;
          min.index = i;
        }
      }

      return this.elevators.find(elev => elevArr[min.index] === elev);
    },
    getDiff(arr, lvl, pos) { return Math.abs(arr[pos].level - lvl) },
    moveCabin(index) {
      console.log(index);
    },
    moveElevator(elevator, destLvl) {
      elevator.ready = false;
      elevator.inMove = true;
      if (elevator.level === destLvl) {
        elevator.inMove = false;
        elevator.rest = true;
        setTimeout(() => {
          elevator.rest = false;
          elevator.ready = true;
        }, 3000);

      } else if (elevator.level < destLvl) {
        elevator.level++;
        setTimeout(() => {
          this.moveElevator(elevator, destLvl)
        }, 1000);

      } else if (elevator.level > destLvl) {
        elevator.level--;
        setTimeout(() => {
          this.moveElevator(elevator, destLvl)
        }, 1000);
      }

    }
  }
}
</script>

<style>
  .main-content {
    display: flex;
  }
  .elevators {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 60%;
    min-height: 70vh;
    border: solid 1px black;
  }
  .buttons {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
  }
</style>
