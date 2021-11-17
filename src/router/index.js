import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        meta: {
          title: '享乐音乐商城'
        },
        component: Home
      },
      {
        path: 'shop',
        meta: {
          isShow: true,
          title: '购物车-享乐音乐商城'
        },
        component: () => import('@/views/shop/')
      }, {
        path: 'user',
        meta: {
          isShow: true,
          title: '会员登录-享乐音乐商城'
        },
        component: () => import('@/views/user/')
      },
      {
        path: 'shequ',
        meta: {
          title: '享乐社区-享乐音乐商城'
        },
        component: () => import('@/views/shequ/')
      },
      {
        path: 'category',
        meta: {
          title: '唱片-分类-享乐音乐商城'
        },
        component: () => import('@/views/category/')
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '会员登录-享乐音乐商城'
    },
    component: () => import('@/views/login/')
  }

]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  document.title = to.meta?.title
  if (to.meta?.isShow) {
    next('/login')
  } else {
    next()
  }
})

export default router
