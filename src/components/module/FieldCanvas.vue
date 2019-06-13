<template>
</template>
<script>
  import L from 'leaflet'
  import * as chroma from 'chroma-js'
  import * as GeoTIFF from 'geotiff'
  import * as d3 from 'd3'
  console.log(d3)
  import './CanvasClass/_main.js'
  export default {
    name:'field-canvas',
    data (){
      return{

      }
    },
    mounted(){

      this.canvas =  new L.CanvasLayer()


      const someUrl = '../../static/223.tif'
      fetch(someUrl).then((res) =>{

          return res.arrayBuffer()
      }).then((buffer) =>{
          const t0 = Date.now()

          L.ScalarField.fromGeoTIFF(buffer,0, (ndvi)=>{

         //console.log(Date.now() - t0,'get ndvi')
          this.canvas = L.canvasLayer.scalarField(ndvi, {
            color: chroma.scale('BrBG').domain(ndvi.range),
            inFilter: (v) => v !== 0,
            opacity:0.5,
            //interpolate:true
          })
          // .addTo(map);
          if(this.$parent._isMounted){
            this.deferredMountedTo(this.$parent.mapObject);
          }
        });


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
