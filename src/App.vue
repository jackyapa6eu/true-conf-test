<template>
  <span>elevators count: {{ elevators.length }}</span>
  <span>levels: {{ levels.length }}</span>
  <div class="main-content">
    <div class="elevators">
      <ElevatorContainer
        v-for="(data, index) in elevators"
        v-bind:key="index"
        v-bind:data="data"
        v-bind:levelsCount="levels.length"
      />
    </div>
    <div class="buttons">
      <ElevatorCallButton
        v-for="(floor, index) in levels"
        v-bind:key="index"
        v-bind:handleClick="() => handleBtnClick(index)"
        v-bind:floor="floor"
      />
    </div>
  </div>
</template>

<script>
import ElevatorContainer from "@/components/ElevatorContainer";
import ElevatorCallButton from "@/components/ElevatorCallButton";
import { elevatorCabObj, buttonCallObj } from "@/utils/defaultObjects";
import { createInitialArray } from "@/utils/helpers";

export default {
  name: 'App',
  components: { ElevatorContainer, ElevatorCallButton },
  data() {
    return {
      elevators: [],
      levels: []
    }
  },
  mounted() {
    this.elevators = createInitialArray(elevatorCabObj, 3);
    this.levels = createInitialArray(buttonCallObj, 6);
  },
  methods: {
    handleBtnClick(destLevel) {
      console.log(destLevel);
      const closestElevator = this.findElevator(destLevel);
      this.moveElevator(closestElevator, destLevel);
    },

    findElevator(destLevel) {
      const freeElevators = this.elevators.filter(elev => elev.ready); // найдем все свободные лифты
      if (freeElevators.find(elev => elev.level === destLevel)) {
        console.log('Лифт уже на этом этаже');
        return
      }
      return this.findClosestElevator(freeElevators, destLevel);

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
