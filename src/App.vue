<template>
  <div id="app">
    <VueSwatche />
    <DrawTool />
  </div>
</template>

<script>
import DrawTool from "./components/DrawTool.vue";
import VueSwatche from "./components/VueSwatche";

export default {
  name: "App",
  components: {
    // HelloWorld,
    DrawTool,
    VueSwatche
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
