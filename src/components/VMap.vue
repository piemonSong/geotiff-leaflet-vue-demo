<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 700px;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker">
        <l-popup :content="text"></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
  //import L from 'leaflet';
 // import { LMap,LTileLayer,LMarker,LPopup} from 'vue2-leaflet'
  import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
  export default{
      name:'Example',
      components:{
          LMap,
          LTileLayer,
          LMarker,
          LPopup
      },
      data () {
          return {
              zoom:5,
              center:L.latLng(35.123312,115.123312),
              url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
              marker:L.latLng(35.123312,115.123312),
              showParagraph: false,
              text:'ssd'
          };
      },
      mounted(){
        //console.log(L)
      },
      methods:{
        zoomUpdate (zoom) {
          //this.currentZoom = zoom;
        },
        centerUpdate (center) {
          //this.currentCenter = center;
        }
      }
  }
</script>
<style>

</style>
