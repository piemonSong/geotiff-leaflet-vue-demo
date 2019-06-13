<template>
  <div class="app-map">
    <button class="i-btn" @click="changeColor">change color</button>
    <i-legend></i-legend>
    <l-map :zoom="initialZoom" :center="initialLocation" :crs="crs">
      <i-geo-raster ref="grid"></i-geo-raster>
      <l-tile-layer :url="url"  :options="tiltOptions"></l-tile-layer>
      <iso-line></iso-line>
      <reaflet-wind></reaflet-wind>
    </l-map>

  </div>
</template>

<script>
  import L from 'leaflet'
  import {
    LMap,
    LTileLayer
  } from "vue2-leaflet";
  import IGeoRaster from './module/georasterLayer.vue'
  import ILegend from './widget/Legend'
  import IsoLine from './module/IsoLine'
  import ReafletWind from './module/ReafletWind'
  export default {
    components: {
      LMap,
      IGeoRaster,
      LTileLayer,
      ILegend,
      IsoLine,
      ReafletWind
    },
    data () {
      return {
        initialLocation: L.latLng(35, 120),
        initialZoom: 4,
       // url:'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        crs: L.CRS.EPSG4326,
        url: "http://t1.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=a10b5d58603d9a7abfe4731e8360fa91",
        attribution: "",
        tiltOptions:{
          tileSize:256,
          zoomOffset:1,
          maxZoom: 20,
          // noWrap:true,
        }

      }
    },
    methods:{
      changeColor(){
        this.$refs.grid.changeColor()
      }
    }
  }
</script>

<style>

  .app-map {
    height: calc(100% - 30px);
    position: relative;
  }
  .i-btn{
    z-index: 444;
    position: absolute;
    top:100px;
    left: 100px;
  }
</style>
