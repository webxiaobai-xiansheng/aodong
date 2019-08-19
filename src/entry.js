/* global Vue */

/* weex initialized here, please do not move this line */
const { router } = require('./router')
const App = require('@/index.vue')
/* eslint-disable no-new */

// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//     // let mycookie = sessionStorage.getItem('mycookie') || '';
//     // if (mycookie) {
//     //     next()
//     // } else {
//     //     if (to.path != '/login') {
//     //         next({ path: '/login' })
//     //     } else {
//     //         next()
//     //     }
//     // }
// })
// import Nat from 'natjs'
// Nat.audio.play('../img/view.mp3')
new Vue(Vue.util.extend({el: '#root', router}, App))
router.push('/')
