<template>
</template>
<script>
  import L from 'leaflet'
  import * as GeoTIFF from 'geotiff'
  import {isolines} from  '../../library/isoline'

  export default {
    name:'isoline-layer',
    data (){
      return{

      }
    },
    mounted(){

      const someUrl = '../../static/pre1.tif';
      const _this = this;
      (async function () {


        let result = await fetch(someUrl)
        if (result.ok) {
          let tiff_data = await(result).arrayBuffer()
          let tiff = await GeoTIFF.fromArrayBuffer(tiff_data)
          let image = await tiff.getImage()
          const data = await image.readRasters();
          const tiepoint = image.getTiePoints()[0];
          const pixelScale = image.getFileDirectory().ModelPixelScale;

          const geoTransform = [tiepoint.x, pixelScale[0], 0, tiepoint.y, 0, -1*pixelScale[1]];

          var tempData = new Array(image.getHeight());
          for (var j = 0; j<image.getHeight(); j++){
            tempData[j] = new Array(image.getWidth());
            for (var i = 0; i<image.getWidth(); i++){
              tempData[j][i] = data[0][i + j*image.getWidth()];
            }
          }
          var intervalsZ = [60000,70000,80000,90000,100000,101000,102000,103000]

          var bandsTemp = isolines(tempData, geoTransform, intervalsZ);
          console.log(bandsTemp)
          _this.isobarsLayer = L.geoJSON(bandsTemp, {
            style: {
              color: '#777',
              weight: 2,
              opacity: 0.65
            },
            //pane:600,
          });

          bandsTemp.features.forEach(function(d, i) {
            const coords =  d.geometry.coordinates
            const label = intervalsZ[i]
            const divIcon = L.divIcon({
              html: label/100,
              className: 'my-div-icon',
              iconSize:[28,14]
            })
            for( let j = 0; j< coords.length;j++){

              L.marker(new L.LatLng(coords[j][0][1],  coords[j][0][0]), {icon: divIcon }).addTo( _this.isobarsLayer)
            }

          })
          _this.$parent.mapObject.addLayer(  _this.isobarsLayer)
        }
      })();
    },
    beforeDestroy() {
      this.removeLayer()
    },
    methods:{
      removeLayer(){
        this.$parent.mapObject.removeLayer(_this.isobarsLayer);
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
