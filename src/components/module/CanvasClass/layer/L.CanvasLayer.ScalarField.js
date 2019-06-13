import Cell from '../Cell';
import * as chroma from 'chroma-js'
import * as GPU from 'gpu.js'
/**
 * ScalarField on canvas (a 'Raster')
 */
L.CanvasLayer.ScalarField = L.CanvasLayer.Field.extend({
    options: {
        type: 'colormap', // [colormap|vector]
        color: null, // function colorFor(value) [e.g. chromajs.scale],
        interpolate: false, // Change to use interpolation
        vectorSize: 20, // only used if 'vector'
        arrowDirection: 'from' // [from|towards]
    },

    initialize: function(scalarField, options) {
        L.CanvasLayer.Field.prototype.initialize.call(
            this,
            scalarField,
            options
        );

        L.Util.setOptions(this, options);
    },

    _defaultColorScale: function() {
        return chroma.scale(['white', 'black']).domain(this._field.range);
    },

    setColor(f) {
        this.options.color = f;
        this.needRedraw();
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function(viewInfo) {
        if (!this.isVisible()) return;
        this._updateOpacity();

        let r = this._getRendererMethod();
        //console.time('onDrawLayer');
        r();
        //console.timeEnd('onDrawLayer');
    },
    /* eslint-enable no-unused-vars */

    _getRendererMethod: function() {
        switch (this.options.type) {
            case 'colormap':
                return this._drawImage.bind(this);
            case 'vector':
                return this._drawArrows.bind(this);
            default:
                throw Error(`Unkwown renderer type: ${this.options.type}`);
        }
    },

    _ensureColor: function() {
        if (this.options.color === null) {
            this.setColor(this._defaultColorScale());
        }
    },

    _showCanvas() {
        L.CanvasLayer.Field.prototype._showCanvas.call(this);
        this.needRedraw(); // TODO check spurious redraw (e.g. hide/show without moving map)
    },

    /**
     * Draws the field in an ImageData and applying it with putImageData.
     * Used as a reference: http://geoexamples.com/d3-raster-tools-docs/code_samples/raster-pixels-page.html
     */
    _drawImage: function() {
        this._ensureColor();

        let ctx = this._getDrawingContext();
        let width = this._canvas.width;
        let height = this._canvas.height;

        //let img = ctx.createImageData(width, height);

      const _this = this;
      const matrix =  this._getAsyncMatrix(width,height,8);
      const t =  Date.now();

     (async () =>
      {
        for (let k = 0; k < matrix.length; k++) {
          await  _this._prepareImageInAsync(...matrix[k], ctx)
        }

      })()
      console.log('DONE')
      console.log(Date.now() - t)



        //let data = img.data;

      //console.log(width,height)
        //const result = this._prepareImageInUseGpu(width,height)
     // console.log(result)
        //ctx.drawImage(result, 0, 0);
        //this._prepareImageIn(data, width, height);

        //ctx.putImageData(img, 0, 0);
    },

    /**
     * Prepares the image in data, as array with RGBAs
     * [R1, G1, B1, A1, R2, G2, B2, A2...]
     * @private
     * @param {[[Type]]} data   [[Description]]
     * @param {Numver} width
     * @param {Number} height
     */
    _prepareImageIn(data, width, height) {

        let f = this.options.interpolate ? 'interpolatedValueAt' : 'valueAt';

        let pos = 0;
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                let pointCoords = this._map.containerPointToLatLng([i, j]);
                let lon = pointCoords.lng;
                let lat = pointCoords.lat;

                let v = this._field[f](lon, lat); // 'valueAt' | 'interpolatedValueAt' || TODO check some 'artifacts'
                if (v !== null) {
                    let color = this._getColorFor(v);
                    let [R, G, B, A] = color.rgba();
                    data[pos] = R;
                    data[pos + 1] = G;
                    data[pos + 2] = B;
                    data[pos + 3] = parseInt(A * 255); // not percent in alpha but hex 0-255
                }
                pos = pos + 4;
            }
        }
       // console.log(data)
    },
    async _prepareImageInAsync(x0,y0,w,h,ctx){
       // return new Promise((v) =>{

          let f = this.options.interpolate ? 'interpolatedValueAt' : 'valueAt';

          let pos = 0;
          const img = ctx.createImageData(w, h)

          const t1 = Date.now()

          //console.log(Date.now() - t1,'finish loop')
          //ctx.putImageData(img, x0, y0);
          //console.log(Date.now() - t1,'finish draw')


       // })
    },
    _prepareImageInUseGpu(width,height){
      let gpu = new GPU({mode: "gpu"})
      let f = this.options.interpolate ? 'interpolatedValueAt' : 'valueAt';
      let t1 = Date.now()
      let pos = 0;
      //const arr = []
       const arr = new Float32Array(height*width)
      const fun = this._field
      let map =  this._map
      for (let j = 0; j < height/4; j++) {
        for (let i = 0; i < width/4; i++) {
          let pointCoords = map.containerPointToLatLng([i, j]);
          let lon = pointCoords.lng;
          let lat = pointCoords.lat;

          let v = fun[f](lon, lat); // 'valueAt' | 'interpolatedValueAt' || TODO check some 'artifacts'
          //arr.push(v)
          arr[width*j+i] = v
        }
      }
      console.log(Date.now() - t1)
      // const fun1 = this._map.containerPointToLatLng,
      //   fun2 = this._field['valueAt'],
      //   fun3 = this._getColorFor
      // //gpu.addFunction(fun1);
      // const calc = gpu.createKernel(function () {
      //     return this.thread.x+this.thread.y
      // }).setOutput([width,height])
      //   .setFunctions([mySuperFunction]);;
      // console.log(calc())
      // const krender = gpu.createKernel(function() {
      //   let pointCoords = fun1([this.thread.y, this.thread.x]);
      //   let lon = pointCoords.lng;
      //   let lat = pointCoords.lat;
      //
      //   let v = fun2(lon, lat); // 'valueAt' | 'interpolatedValueAt' || TODO check some 'artifacts'
      //   if (v !== null) {
      //     let color = fun3(v);
      //     let [R, G, B, A] = color.rgba();
      //     this.color(R, G, B, A);
      //
      //   }
      // })
      //   .setFunctions([fun1,fun2,fun3])
      //   .setOutput([width, height])
      //   .setGraphical(true);
      //
      // return  krender.getCanvas();
    },
    // _getDelay(x0,y0,wt,wt){
    //   // return new Promise(function () {
    //   //
    //   // })
    //   // for (let j = y0; j < y0+h; j++) {
    //   //   for (let i = x0; i <x0+w; i++) {
    //   //     let pointCoords = _map.containerPointToLatLng([i, j]);
    //   //     let lon = pointCoords.lng;
    //   //     let lat = pointCoords.lat;
    //   //
    //   //     // let v = field[f](lon, lat); // 'valueAt' | 'interpolatedValueAt' || TODO check some 'artifacts'
    //   //     // if (v !== null) {
    //   //     //   let color = this._getColorFor(v);
    //   //     //   let [R, G, B, A] = color.rgba();
    //   //     //   data[pos] = R;
    //   //     //   data[pos + 1] = G;
    //   //     //   data[pos + 2] = B;
    //   //     //   data[pos + 3] = 255; // not percent in alpha but hex 0-255
    //   //     // }
    //   //     // pos = pos + 4;
    //   //   }
    //   // }
    // },
    /**
     * Draws the field as a set of arrows. Direction from 0 to 360 is assumed.
     */
    _drawArrows: function() {
        const bounds = this._pixelBounds();
        const pixelSize = (bounds.max.x - bounds.min.x) / this._field.nCols;

        var stride = Math.max(
            1,
            Math.floor(1.2 * this.options.vectorSize / pixelSize)
        );

        const ctx = this._getDrawingContext();
        ctx.strokeStyle = this.options.color;

        var currentBounds = this._map.getBounds();

        for (var y = 0; y < this._field.height; y = y + stride) {
            for (var x = 0; x < this._field.width; x = x + stride) {
                let [lon, lat] = this._field._lonLatAtIndexes(x, y);
                let v = this._field.valueAt(lon, lat);
                let center = L.latLng(lat, lon);
                if (v !== null && currentBounds.contains(center)) {
                    let cell = new Cell(
                        center,
                        v,
                        this.cellXSize,
                        this.cellYSize
                    );
                    this._drawArrow(cell, ctx);
                }
            }
        }
    },

    _pixelBounds: function() {
        const bounds = this.getBounds();
        const northWest = this._map.latLngToContainerPoint(
            bounds.getNorthWest()
        );
        const southEast = this._map.latLngToContainerPoint(
            bounds.getSouthEast()
        );
        var pixelBounds = L.bounds(northWest, southEast);
        return pixelBounds;
    },

    _drawArrow: function(cell, ctx) {
        var projected = this._map.latLngToContainerPoint(cell.center);

        // colormap vs. simple color
        let color = this.options.color;
        if (typeof color === 'function') {
            ctx.strokeStyle = color(cell.value);
        }

        const size = this.options.vectorSize;
        ctx.save();

        ctx.translate(projected.x, projected.y);

        let rotationRads = (90 + cell.value) * Math.PI / 180; // from, by default
        if (this.options.arrowDirection === 'towards') {
            rotationRads = rotationRads + Math.PI;
        }
        ctx.rotate(rotationRads);

        ctx.beginPath();
        ctx.moveTo(-size / 2, 0);
        ctx.lineTo(+size / 2, 0);
        ctx.moveTo(size * 0.25, -size * 0.25);
        ctx.lineTo(+size / 2, 0);
        ctx.lineTo(size * 0.25, size * 0.25);
        ctx.stroke();
        ctx.restore();
    },

    /**
     * Gets a chroma color for a pixel value, according to 'options.color'
     */
    _getColorFor(v) {
        let c = this.options.color; // e.g. for a constant 'red'
        if (typeof c === 'function') {
            c = this.options.color(v);
        }
        let color = chroma(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency
        return color;
    },
    /**
     * get canvas Tile
     */
    _getAsyncMatrix(w,h,num){
       let x0 = Math.floor(w/num),y0 =  Math.floor(h/num)
       const matrix = []
       for(let i = 0; i < num;i++){
         for(let j = 0; j < num;j++){
            const w0 = (j == num-1)?w-(j-1)*x0:x0
            const h0 = (i == num-1)?h-(i-1)*y0:y0
            matrix.push([j*x0,i*y0,w0,h0])
         }
       }
       return matrix
    }
});

L.canvasLayer.scalarField = function(scalarField, options) {
    return new L.CanvasLayer.ScalarField(scalarField, options);
};
