<template>
  <button
    type="button"
    class="floor__button"
    v-on:click="callElevator"
    v-bind:class="{
      'floor__button_pressed': floor.pressed
    }"
  />
</template>

<script>
export default {
  name: "ElevatorCallButton",
  props: {
    handleClick: Function,
    floor: {
      pressed: Boolean,
      id: Number
    }
  },
  methods: {
    callElevator() {
      if (this.floor.pressed) {
        return
      }
      this.handleClick();
    }
  }
}
</script>

<style scoped>
  .floor__button {
    cursor: pointer;
    height: 10px;
    width: 20px;
    border: solid 2px orange;
    transition: box-shadow ease .3s;
  }
  .floor__button_pressed {
    background: #9b1313;
    box-shadow: 0 0 20px #9b1313;
    border: solid 2px #450505;
  }
  .floor__button:hover {
    box-shadow: 0 0 3px white;
  }

</style>
