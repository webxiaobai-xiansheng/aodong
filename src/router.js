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

Vue.use(Router)

export const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: login
    // },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: { name: 'batch' },
      // redirect: { name: 'popUp' },
      children: [
        // 批料待发间
        {
            path: '/batch',
            name: 'batch',
            component: batch
        },
        // 制粒间和总混间
        // {
        //   path: '/granulating',
        //   name: 'granulating',
        //   component: granulating
        // },
        // 胶囊间和压片间
        // {
        //   path: '/capsule',
        //   name: 'capsule',
        //   component: capsule
        // },
        // 包衣间
        // {
        //   path: '/laggingCover',
        //   name: 'laggingCover',
        //   component: laggingCover
        // },
        // 内包间
        // {
        //   path: '/insourcing',
        //   name: 'insourcing',
        //   component: insourcing
        // },
        // 中间站
        // {
        //   path: '/wayStation',
        //   name: 'wayStation',
        //   component: wayStation
        // },
        // 清洗间
        // {
        //   path: '/cleaning',
        //   name: 'cleaning',
        //   component: cleaning
        // },
        // 权限登录
        // {
        //   path: '/jurisLogin',
        //   name: 'jurisLogin',
        //   component:jurisLogin
        // }
        // 输入信息
        // {
        //   path: '/popUp',
        //   name: 'popUp',
        //   component: popUp
        // }
        
      ]
    },
    {
      path: '/jurisLogin',
      name: 'jurisLogin',
      component: jurisLogin
    },
    {
      path: '/jurisLoginMessage',
      name: 'jurisLoginMessage',
      component: jurisLoginMessage
    }
  ]
})
