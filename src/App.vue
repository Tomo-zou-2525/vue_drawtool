<template>
  <div id="app">
    <p><VueSwatche /></p>
    <div id="nav">
      <router-link to="/">DrawTool</router-link> |
      <router-link to="/about">Calender</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import VueSwatche from "./components/VueSwatche";

export default {
  name: "App",
  components: {
    VueSwatche,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
