<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App"
};
</script>

<style lang="scss">
body {
  background: #252C4A;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
</style>
