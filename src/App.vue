<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <DrawTool />
    <h1>うほうほ</h1>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import DrawTool from "./components/DrawTool.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
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
