<template>

</template>
<script>
  import L from 'leaflet'
  import  '../../library/leaflet-velocity4326'


  export default {
      data(){
        return {
        }
      },
      created(){
        this.layer =  L.velocityLayer({
          displayValues: false,
          displayOptions: {
            velocityType: 'Global Wind',
            displayPosition: 'bottomleft',
            displayEmptyString: 'No wind data'
          },
          maxVelocity: 12,
          minVelocity: 0,
          option:{

          }
        });

        if(this.$parent._isMounted){
          this.deferredMountedTo(this.$parent.mapObject);
        }

      },
      mounted(){
        const url ='../../static/wind.json';
        fetch(url).then((response)=>{
          return response.json();
        })
          .then((myJson) =>{
           // console.log(myJson,1111111);
            this.setData(myJson)
          });
      },
      methods:{
        beforeDestroy() {
          this.removeLayer()
        },
        removeLayer(){
          this.$parent.mapObject.removeLayer(this.layer);
        },

        deferredMountedTo(parent) {
          this.layer.addTo(parent);
          this.attributionControl = parent.attributionControl;
          for (let i = 0; i < this.$children.length; i++) {
            if (typeof this.$children[i].deferredMountedTo === "function") {
              this.$children[i].deferredMountedTo(this.layer);
            }
          }
        },
        setData(data){
          this.layer.setData(data)
        },
        getIdentifyInfo(e){
          return this.layer.getIdentify(e)
        },
        hideAndShow(flag){
            if(flag)
              this.deferredMountedTo(this.$parent.mapObject);
            else
              this.removeLayer()
        }
      }
  }
</script>
<style>

</style>
