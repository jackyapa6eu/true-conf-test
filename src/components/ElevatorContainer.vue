<template>
  <ElevatorCab v-bind:data="data" v-bind:levelsCount="levelsCount"/>
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
    levelsCount: Number
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
