<template>
  <ElevatorCab v-bind:data="data" v-bind:levelsCount="levelsCount" v-bind:tasks="tasks"/>
</template>

<script>
import ElevatorCab from "@/components/ElevatorCab";

export default {
  name: "ElevatorContainer",
  components: {
    ElevatorCab
  },
  props: {
    data: Object,
    levelsCount: Number,
    tasks: Array
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
