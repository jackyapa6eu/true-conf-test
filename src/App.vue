<template>
  <span>elevators count: {{ elevators.length }}</span>
  <span>levels: {{ levels.length }}</span>
  <div class="main-content">
    <div class="elevators">
      <ElevatorCab
        v-for="data in elevators"
        v-bind:data="data"
        v-bind:key="data.id"
        v-bind:levelsCount="levels.length"
      />
    </div>
    <div class="floors">
      <div class="floor" v-for="(floor, index) in levels" v-bind:key="index" v-bind:style="floorStyles">
        <span class="floor__sign">{{index + 1}}</span>
        <ElevatorCallButton
          v-bind:handleClick="() => handleBtnClick(index)"
          v-bind:floor="floor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ElevatorCallButton from "@/components/ElevatorCallButton";
import ElevatorCab from "@/components/ElevatorCab";
import {buildingSettings, elevatorSettings} from "@/constants/constants";

export default {
  name: 'App',
  components: {ElevatorCab, ElevatorCallButton },
  data() {
    return {
      elevators: [],
      levels: []
    }
  },
  mounted() {
    this.elevators = this.createElevators(buildingSettings.elevatorsNumber);
    this.levels = this.createLevels(buildingSettings.floorsNumber);
  },
  methods: {
    handleBtnClick(destLevel) {
      const closestElevator = this.findElevator(destLevel);
      console.log(closestElevator);
      if (closestElevator) {
        this.levels[destLevel].pressed = true;
        closestElevator.tasks.push(destLevel);
        if (closestElevator.ready) {
          this.moveElevator(closestElevator, destLevel);
        }
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
        const occupancyOfElevators = this.elevators.map((el) => {
          const tasks = el.tasks.slice(0);
          tasks.unshift(el.level);
          let duration = 0;
          if (tasks.length === 0) {
            return 0
          }
          for (let i = 0; i < tasks.length - 1; i++) {
            duration += Math.abs(tasks[i] - tasks[i + 1]);
          }
          return duration
        });
        return this.elevators[occupancyOfElevators.indexOf(Math.min(...occupancyOfElevators))];
      }

    },

    findClosestFreeElevator(elevArr, destLevel) {
      const min = {
        diff: Math.abs(elevArr[0].level - destLevel),
        index: 0
      }
      for (let i = 1; i < elevArr.length; i++) {
        const diff = Math.abs(elevArr[i].level - destLevel);
        if (diff < min.diff) {
          min.diff = diff;
          min.index = i;
        }
      }
      return this.elevators.find(elev => elevArr[min.index] === elev);
    },

    moveElevator(elevator, destLvl) {
      elevator.ready = false;
      elevator.inMove = true;
      if (elevator.level === destLvl) {
        elevator.inMove = false;
        elevator.rest = true;
        elevator.down = false;
        elevator.up = false;
        setTimeout(() => {
          elevator.rest = false;
          elevator.ready = true;
          elevator.tasks.shift();
          this.levels[destLvl].pressed = false;
          if (elevator.tasks.length > 0) {
            this.moveElevator(elevator, elevator.tasks[0]);
          }

        }, elevatorSettings.restTime * 1000);

      } else if (elevator.level < destLvl) {
        elevator.level++;
        elevator.up = true;
        setTimeout(() => {
          this.moveElevator(elevator, destLvl)
        }, elevatorSettings.speed * 1000);

      } else if (elevator.level > destLvl) {
        elevator.level--;
        elevator.down = true;
        setTimeout(() => {
          this.moveElevator(elevator, destLvl)
        }, elevatorSettings.speed * 1000);
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
            tasks: [],
            down: false,
            up: false
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
  },

  computed: {
    floorStyles: function () {
      return {
        height: `${100 / this.levels.length}%`
      }
    }
  },

}
</script>

<style>
  body {
    margin: 10px;
  }
  .main-content {
    display: flex;
  }
  .elevators {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    min-height: 93vh;
    border-right: solid 2px black;
    background: #333333;
    padding: 3px;
  }
  .floors {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
  }
  .floor {
    position: relative;
    background: gray;
    width: 80px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 2px black solid;
    padding-left: 10px;
  }
  .floor__sign {
    position: absolute;
    text-align: center;
    width: 30px;
    background: #af9823;
    border: solid 2px #796913;
    color: yellow;
    top: 3px;
    right: 3px;
    box-sizing: border-box;
  }
</style>
