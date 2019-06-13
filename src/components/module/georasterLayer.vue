<template>
</template>
<script>
  import L from 'leaflet'
  import * as parse_georaster from 'georaster'
  import * as GeoRasterLayer from 'georaster-layer-for-leaflet'
  import * as chroma from 'chroma-js'
  export default {
    name:'test-canvas',
    data (){
      return{

      }
    },
    mounted(){
      //const someUrl = '../../static/Z_NAFP_C_BABJ_20180701091809_P_CLDAS_RT_ASI_0P0625_HOR-PRS-2018070109.tif'
      const someUrl = '../../static/tmp.tif'
      fetch(someUrl).then((res) =>{

        return res.arrayBuffer()
      }).then((buffer) =>{

        parse_georaster(buffer).then(georaster  => {
          //  console.log(georaster)
          //  console.log("georaster:", georaster)
          this.canvas = new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.5,
            color:chroma.scale('Spectral').domain([1,0]),
              //chroma.scale(['#F15F73','#797AEC','#1BDBB5','#1BC064','#F9CD7E'])
              //chroma.scale('Spectral')
//            chroma.scale(['#d67d0d',
//              '#f6e8c3',
//              '#7beae3',
//              '#01dccb']),

            updateWhenZooming:false,
            noWrap:true
           // pixelValueToColorFn: value => value < -1 ? '#ffffff' : '#000000'
          });

          if(this.$parent._isMounted){
            this.deferredMountedTo(this.$parent.mapObject);
          }
        })
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
      },
      changeColor(){
        this.canvas.scale = chroma.scale('RdYlBu')
        this.canvas.redraw()
      }
    }
  }
</script>
