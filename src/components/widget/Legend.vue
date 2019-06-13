<template>
    <div class="legend">
      <div class="color-bar" :style="{background:colorMap }"></div>
      <ul class="color-label">
        <li v-for="(item,i) in labelList" :key="i">{{ item }}</li>
      </ul>
    </div>
</template>
<script>
  export default {
        name:'ilegend',
        data(){
            return {
              colors:["#0000ff", "#00fff7", "#00ff08", "#ffff00", "#ff0000"],
              labelList:[10,15,20,25]
            }
        },
        computed:{
          colorMap(){
              return `linear-gradient(to top,${this.colors})`
          }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
<style scoped>
  .legend{
    position: absolute;
    right:10px;
    bottom:30px;
    background: rgba(0,0,0,.5);
    height: 70%;
    max-height: 500px;
    width: 60px;
    z-index: 888;
    border-radius: 5px;
    padding: 10px 5px;
    box-sizing: border-box;
    text-align: left;
  }
  .color-bar{
    width:15px;
    height: calc(100% - 40px);
    display: inline-block;
  }
  .color-label{
   display: inline-block;
  }
  .color-label li{

  }
</style>
