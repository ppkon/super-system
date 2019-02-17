// 引入vue
import Vue from 'vue'
// 引入路由
import Router from 'vue-router'
// 引入home组件
// import Home from './views/Home.vue'

// 注册路由(使用路由)
Vue.use(Router)
// 导出路由实例对象
export default new Router({
  routes: [
    {
      path: '/login',//路径
      name: 'login',//名字
      component: () => import('./views/login/login.vue')//引入登录组件
    }, {
      path: '/',
      name: 'index',
      component: () => import('./views/index/index.vue'),
      children: [//子路由
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home/Home.vue'),
        },
        {
          path: '/accountmanage',
          name: 'AccountManage',
          component: () => import('./views/AccountManage/AccountManage.vue'),
        },
        {
          path: '/accountadd',
          name: 'AccountAdd',
          component: () => import('./views/AccountAdd/AccountAdd.vue'),
        },
        {
          path: '/passwordmodify',
          name: 'PasswordModify',
          component: () => import('./views/PasswordModify/PasswordModify.vue'),
        },
        {
          path: '/goodsmanage',
          name: 'GoodsManage',
          component: () => import('./views/GoodsManage/GoodsManage.vue'),
        },
        {
          path: '/goodsadd',
          name: 'GoodsAdd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
        },
        {
          path: '/salestatistics',
          name: 'SaleStatistics',
          component: () => import('./views/SaleStatistics/SaleStatistics.vue'),
        },

      ]
    }
  ]
})
