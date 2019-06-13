<template>
  <div id="app">

    <v-map :zoom="initialZoom" :center="initialLocation">
      <v-protobuf :url="tilesUrl" :options="opts" ref="grid"></v-protobuf>
    </v-map>
  </div>
</template>

<script>
  import L from 'leaflet'
  import Vue2Leaflet from 'vue2-leaflet'
  import Vue2LeafletVectorGridProtobuf from './module/Vue2LeafletVectorGridProtobuf'
  import vectorStyle from './style'
  const vectorTileOptions = {
    attribution: '© ESRI',
    vectorTileLayerStyles: vectorStyle,
  }
  export default {
    components: {
      'v-map': Vue2Leaflet.LMap,
      'v-protobuf': Vue2LeafletVectorGridProtobuf
    },
    data () {
      return {
        initialLocation: L.latLng(0, 0),
        initialZoom: 2,
        opts: vectorTileOptions,
        tilesUrl: "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"
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

  #app {
    height: 100%;
    position: relative;
  }

</style>
