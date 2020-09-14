<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <DrawTool />
  </div>
</template>

<script>
import DrawTool from "./components/DrawTool.vue";

export default {
  name: "App",
  components: {
    DrawTool
  }
};
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
