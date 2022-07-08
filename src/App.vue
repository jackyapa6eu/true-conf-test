<template>
  <input type="range" min="3" max="10" v-model.number="levelsCount" @change="handleSettingsChange">
  <span>levels: {{ levelsCount }}</span>
  <input type="range" min="1" max="5" v-model.number="elevatorsCount" @change="handleSettingsChange">
  <span>elevators: {{ elevatorsCount }}</span>
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
import {elevatorSettings} from "@/constants/constants";

export default {
  name: 'App',
  components: {ElevatorCab, ElevatorCallButton },
  data() {
    return {
      elevators: [],
      levels: [],
      levelsCount: 5,
      elevatorsCount: 2
    }
  },
  mounted() {
    const elevators = JSON.parse(localStorage.getItem('elevators'));
    const levels = JSON.parse(localStorage.getItem('levels'));
    if (elevators && levels) {
      this.elevators = elevators;
      this.levels = levels;
      this.levelsCount = levels.length;
      this.elevatorsCount = elevators.length;
      const restingElevators = this.elevators.filter(el => el.rest); // нашли "отдыхающие" лифты
      restingElevators.forEach(el => this.finishRest(el, el.level)); // завершили их "отдых"

      const movingElevators = this.elevators.filter(el => el.inMove);
      movingElevators.forEach(el => this.moveElevator(el, el.tasks[0]));

    } else {
      this.elevators = this.createElevators(this.elevatorsCount);
      this.levels = this.createLevels(this.levelsCount);
      this.saveAppCondition();
    }
  },
  methods: {
    handleBtnClick(destLevel) {
      const closestElevator = this.findElevator(destLevel);
      if (closestElevator) {
        this.levels[destLevel].pressed = true;
        closestElevator.tasks.push(destLevel);
        if (closestElevator.ready) {
          this.moveElevator(closestElevator, destLevel);
        }
      }
    },
    handleSettingsChange() {
      this.levels = this.createLevels(this.levelsCount);
      this.elevators = this.createElevators(this.elevatorsCount);
      this.saveAppCondition();
    },
    findElevator(destLevel) {
      const freeElevators = this.elevators.filter(elev => elev.ready); // найдем все свободные лифты
      if (freeElevators.find(elev => elev.level === destLevel)) {
        return false
      } else if (freeElevators.length > 0) {
        return this.findClosestFreeElevator(freeElevators, destLevel);
      } else {
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
          this.finishRest(elevator, destLvl);
          this.saveAppCondition();
        }, elevatorSettings.restTime * 1000);

      } else if (elevator.level < destLvl) {
        elevator.level++;
        elevator.up = true;
        setTimeout(() => {
          this.moveElevator(elevator, destLvl);
          this.saveAppCondition();
        }, elevatorSettings.speed * 1000);

      } else if (elevator.level > destLvl) {
        elevator.level--;
        elevator.down = true;
        setTimeout(() => {
          this.moveElevator(elevator, destLvl);
          this.saveAppCondition();
        }, elevatorSettings.speed * 1000);
      }
      this.saveAppCondition();
    },

    finishRest(elevator, destLvl) {
      elevator.rest = false;
      elevator.ready = true;
      elevator.tasks.shift();
      this.levels[destLvl].pressed = false;
      if (elevator.tasks.length > 0) {
        this.moveElevator(elevator, elevator.tasks[0]);
      }
      this.saveAppCondition();
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
    },

    saveAppCondition() {
      localStorage.setItem('elevators', JSON.stringify(this.elevators));
      localStorage.setItem('levels', JSON.stringify(this.levels));
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
    background: azure;
  }
  .main-content {
    display: flex;
  }
  .elevators {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    min-height: 91vh;
    border-right: solid 2px black;
    background: #333333;
    padding: 3px;
  }
  .floors {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    border-right: 2px solid black;
  }
  .floor {
    position: relative;
    background: gray;
    width: 150px;
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
