<template>
  <div id="app">
    <Main msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Main from "./components/Main";

export default {
  name: 'app',
  components: {
    Main,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
