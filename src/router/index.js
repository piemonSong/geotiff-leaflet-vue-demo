import Vue from 'vue'
import Router from 'vue-router'
import Simple from '@/components/Simple'
import LMap1 from '@/components/VMap'
import Vectorgrid from '@/components/Vectorgrid'
import TestCanvasLayer from '@/components/TestCanvasLayer'
import TestFieldCanvas from '@/components/TestFieldCanvas'
import TestGeoraster from '@/components/TestGeoraster'
import ElementCompTest from '@/components/ElementCompTest'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lmap',
      component: TestCanvasLayer
    },{
      path: '/lmap',
      name: 'simple',
      component: Simple
    },{
      path: '/vg',
      name: 'vectorgrid',
      component: Vectorgrid
    },
    {
      path: '/cf',
      name: 'fieldcanvas',
      component: TestFieldCanvas
    },
    {
      path: '/gr',
      name: 'georaster',
      component: TestGeoraster
    },
    {
      path: '/ele',
      name: 'ele-test',
      component: ElementCompTest
    }
  ]
})
