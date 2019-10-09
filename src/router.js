/* global Vue */
import Router from 'vue-router';
import login from '@/view/login';
import home from '@/view/home';
import batch from '@/view/home/batch';
import granulating from '@/view/home/granulating';
import capsule from '@/view/home/capsule';
import laggingCover from '@/view/home/laggingCover';
import insourcing from '@/view/home/insourcing';
import wayStation from '@/view/home/wayStation';
import cleaning from '@/view/home/cleaning';
import jurisLogin from '@/view/jurisLogin';
import jurisLoginMessage from '@/view/jurisLoginMessage';
import popUp from '@/view/home/popUp';
import containerLogin from '@/view/containerLogin'; //桶/库位绑定登录
import containerLoginMessage from '@/view/containerLoginMessage'; //桶/库位绑定页面

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    // 权限登录
    {
      path: '/jurisLogin',
      name: 'jurisLogin',
      component: jurisLogin
    },
    {
      path: '/jurisLoginMessage',
      name: 'jurisLoginMessage',
      component: jurisLoginMessage
    },
    {
      path: '/containerLogin',
      name: 'containerLogin',
      component: containerLogin
    },
    {
      path: '/containerLoginMessage',
      name: 'containerLoginMessage',
      component: containerLoginMessage
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: { name: 'batch' },
      children: [
        // 批料待发室
        {
            path: '/batch',
            name: 'batch',
            component: batch
        },
        // 制粒室和批混室
        {
          path: '/granulating',
          name: 'granulating',
          component: granulating
        },
        // 胶囊填充室和压片室
        {
          path: '/capsule',
          name: 'capsule',
          component: capsule
        },
        // 包衣室
        {
          path: '/laggingCover',
          name: 'laggingCover',
          component: laggingCover
        },
        // 内包间
        {
          path: '/insourcing',
          name: 'insourcing',
          component: insourcing
        },
        // 中间站
        {
          path: '/wayStation',
          name: 'wayStation',
          component: wayStation
        },
        // 容器具清洗室
        {
          path: '/cleaning',
          name: 'cleaning',
          component: cleaning
        },
        // 输入信息
        {
          path: '/popUp',
          name: 'popUp',
          component: popUp
        }
        
      ]
    }
  ]
})
