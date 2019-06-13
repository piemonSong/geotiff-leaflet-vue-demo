// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import L from 'leaflet';
import App from './App';
import router from './router'
import Element from 'element-ui';
import 'leaflet.icon.glyph';
import 'element-ui/lib/theme-chalk/index.css';
import vco from "v-click-outside";
import EleMultiCascader from "ele-multi-cascader"
Vue.use(Element);

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(EleMultiCascader)
Vue.use(vco);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
