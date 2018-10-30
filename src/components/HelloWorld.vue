<template>
  <div class="hello">
    <canvas id="plot"></canvas>
  </div>
</template>

<script>
import * as GeoTIFF from 'geotiff'
import * as d3 from 'd3'
import * as plotty from 'plotty'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    const someUrl = '../static/223.tif'
    const canvas = document.getElementById("plot");
    GeoTIFF.fromUrl(someUrl)
      .then(tiff => {
        tiff.getImage().then( image => {
            console.log(image)
          image.readRasters({ resampleMethod: 'bilinear' }).then(data => {
            const plot = new plotty.plot({
              canvas,
              data: data[0],
              width: image.getWidth(),
              height: image.getHeight(),
              domain: [0, 1],
              noDataValue:-3.40282346639e+038,
              colorScale: "viridis"
            });
            plot.render();
          })
        })
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
