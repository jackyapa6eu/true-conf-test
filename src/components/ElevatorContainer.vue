<template>
  <div>
    <ElevatorCab v-bind:data="data" />
  </div>
</template>

<script>
import ElevatorCab from "@/components/ElevatorCab";

export default {
  name: "ElevatorContainer",
  components: {
    ElevatorCab
  },
  props: {
    data: Object
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>

</style>
