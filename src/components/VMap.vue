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
              url:'https://t0.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=a10b5d58603d9a7abfe4731e8360fa91',
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
