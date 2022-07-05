<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <ElevatorCab/>
</template>

<script>
import ElevatorCab from "@/components/ElevatorCab";

export default {
  name: 'App',
  components: {
    ElevatorCab
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
