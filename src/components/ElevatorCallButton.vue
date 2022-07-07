<template>
  <button
    type="button"
    v-on:click="callElevator"
    v-bind:style="buttonStyles"
  >
    Click {{ floor.id + 1 }}
  </button>
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
  },
  computed: {
    buttonStyles: function () {
      return {
        background: this.floor.pressed ? 'red' : 'green'
      }
    }
  }
}
</script>

<style scoped>

</style>
