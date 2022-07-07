<template>
  <button type="button" v-on:click="callElevator">Click {{ floor.id + 1 }}</button>
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

</style>
