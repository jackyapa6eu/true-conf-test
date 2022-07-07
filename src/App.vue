<template>
  <span>elevators count: {{ elevators.length }}</span>
  <span>levels: {{ levels.length }}</span>
  <div class="main-content">
    <div class="elevators">
      <ElevatorContainer
        v-for="data in elevators"
        v-bind:key="data.id"
        v-bind:data="data"
        v-bind:levelsCount="levels.length"
        v-bind:tasks="data.tasks"
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
    this.elevators = this.createElevators(2);
    this.levels = this.createLevels(12);
  },
  methods: {
    handleBtnClick(destLevel) {
      const closestElevator = this.findElevator(destLevel);
      if (closestElevator) {
        this.levels[destLevel].pressed = true;
        closestElevator.tasks.push(destLevel);
        this.moveElevator(closestElevator, destLevel);
      }
    },

    findElevator(destLevel) {
      const freeElevators = this.elevators.filter(elev => elev.ready); // найдем все свободные лифты
      if (freeElevators.find(elev => elev.level === destLevel)) {
        console.log('Лифт уже на этом этаже');
        return false
      } else if (freeElevators.length > 0) {
        return this.findClosestFreeElevator(freeElevators, destLevel);
      } else {
        console.log('ИЩЕМ ПОДХОДЯЩИЙ ЛИФТ');
      }

    },

    findClosestFreeElevator(elevArr, destLevel) {
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
      //console.log(this.elevators);
      elevator.ready = false;
      elevator.inMove = true;
      if (elevator.level === destLvl) {
        elevator.inMove = false;
        elevator.rest = true;
        setTimeout(() => {
          elevator.rest = false;
          elevator.ready = true;
          elevator.tasks.shift();
          this.levels[destLvl].pressed = false;
          if (elevator.tasks.length > 0) {
            this.moveElevator(elevator, elevator.tasks[0]);
          }

        }, 1000);

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

    },

    createElevators(count) {
      const resultArr = [];
      for (let i = 0; i < count; i++) {
          resultArr.push({
            id: i,
            rest: false,
            inMove: false,
            ready: true,
            level: 0,
            tasks: [3, 5, 1]
          });
        }
      return resultArr
    },

    createLevels(count) {
      const resultArr = [];
      for (let i = 0; i < count; i++) {
        resultArr.push({
          id: i,
          pressed: false
        });
      }
      return resultArr
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
