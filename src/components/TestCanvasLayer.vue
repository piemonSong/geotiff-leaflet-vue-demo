<template>
  <div id="app">
    <v-map :zoom="initialZoom" :center="initialLocation">
      <v-canvas></v-canvas>
      <l-tile-layer :url="url"></l-tile-layer>
    </v-map>
  </div>
</template>

<script>
  import L from 'leaflet'
  import Vue2Leaflet from 'vue2-leaflet'
  import CanvasLayer from './module/CanvasLayer.vue'

  export default {
    components: {
      'v-map': Vue2Leaflet.LMap,
      'v-canvas': CanvasLayer,
      'l-tile-layer':Vue2Leaflet.LTileLayer
    },
    data () {
      return {
        initialLocation: L.latLng(35, 120),
        initialZoom: 4,
        url:'https://t0.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=a10b5d58603d9a7abfe4731e8360fa91',
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>
