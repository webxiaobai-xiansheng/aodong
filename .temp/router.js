import Vue from 'vue'
/* global Vue */
import Router from 'vue-router';
// import vPopoverBatch from '@/components/vPopoverBatch';
// import vPopoverMark from '@/components/vPopoverMark'
// import vPopoverCapsule from '@/components/vPopoverCapsule'
// import vPopoverPackage from '@/components/vPopoverPackage'
import vPopoverInside from '@/components/vPopoverInside'
import vPopoverWay from '@/components/vPopoverWay'
Vue.use(Router)

export const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'vPopoverBatch',
    //   component: vPopoverBatch
    // },
    // {
    //   path: '/',
    //   name: 'vPopoverMark',
    //   component: vPopoverMark
    // }
    // {
    //   path: '/',
    //   name: 'vPopoverCapsule',
    //   component: vPopoverCapsule
    // }
    // {
    //   path: '/',
    //   name: 'vPopoverInside',
    //   component: vPopoverInside
    // }
    {
      path: '/',
      name: 'vPopoverWay',
      component: vPopoverWay
    }
  ]
})
