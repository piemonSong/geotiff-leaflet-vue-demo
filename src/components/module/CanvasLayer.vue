<template>
</template>
<script>
  import L from 'leaflet'
  import '../../canvas_layer/leaflet-canvas'
   export default {
       name:'test-canvas',
       data (){
           return{

           }
       },
       mounted(){
           this.points = [];
           var point = {
             latitude: -90,
             longitude: -180,
           };

           for (var i=0;i<100000;i++) {
             const data = [Math.random()*180+point.latitude,
               point.longitude+Math.random()*360
             ]
             this.points.push(data);
           }
           this.canvas =  new L.CanvasLayer()
           if(this.$parent._isMounted){
             this.deferredMountedTo(this.$parent.mapObject);
           }
         const canvas = this.canvas,points = this.points;
         canvas.on('zoom', function(info) {
           canvas.draw()
         })
         canvas.on('drawing', function(info) {

           const canvas = info.canvas;
           const ctx = canvas.getContext('2d');

           //clear current drawing
           //ctx.clearRect(0,0, canvas.width, canvas.height);
           ctx.fillStyle = "rgb(255, 158, 35)";

          console.log(points)
           //const firstDot = info.layer._map.latLngToContainerPoint([points[0].latitude, points[0].longitude]);
           for (var i=0;i<points.length;i++) {
             var bounds = info.layer._map.getBounds()
             if(bounds.contains(L.latLng([points[i][0], points[i][1]]))) {
               var dot = info.layer._map.latLngToContainerPoint([points[i][0], points[i][1]]);
               ctx.beginPath();
               ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2)
               ctx.fill()
               ctx.closePath()
             }
           }

         })
       },
       beforeDestroy() {
         this.removeLayer()
       },
       methods:{
           removeLayer(){
             this.$parent.mapObject.removeLayer(this.canvas);
           },
          deferredMountedTo(parent) {
            this.canvas.addTo(parent);
            this.attributionControl = parent.attributionControl;
            for (var i = 0; i < this.$children.length; i++) {
              if (typeof this.$children[i].deferredMountedTo === "function") {
                this.$children[i].deferredMountedTo(this.canvas);
              }
            }
          }
      }
   }
</script>
