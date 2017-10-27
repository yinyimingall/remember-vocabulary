<template>
  <div id="app">
    <head-bar></head-bar>
    <router-view/>
  </div>
</template>

<script>
import headBar from '@/components/header'
export default {
  name: "app",
  components: {
    headBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  /* max-width: 1046px; */
  max-width: 1080px;
  margin: 0 auto;
}
</style>
