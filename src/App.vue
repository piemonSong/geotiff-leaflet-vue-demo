<template>
  <div id="app">
    <p>
    <router-link to="/">Home</router-link>
    <router-link to="/lmap">LMap</router-link>
    <router-link to="/vg">VectorGrid</router-link>
    <router-link to="/cf">CanvasField</router-link>
    </p>
    <router-view/>
   <!-- <v-map style="height: 800px"></v-map>-->

  </div>
</template>

<script>
/*import VMap from './components/VMap.vue'*/
export default {
  name: 'App',
}
</script>

<style>
@import "../node_modules/leaflet/dist/leaflet.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
