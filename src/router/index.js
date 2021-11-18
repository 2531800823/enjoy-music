import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home/'
import Zhuye from "@/views/home/component/ZhuYe.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/index',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        children: [
          {
            path: '',
            meta: {
              title: '享乐音乐商城'
            },
            component: Zhuye
          },
          {
            path: 'books/:id',
            meta: {
              title: '享乐音乐商城'
            },
            component: () => import('@/views/home/component/Books.vue')
          }
        ]
      },
      {
        path: 'shop',
        path: 'Shop',
        meta: {
          isShow: true,
          title: '购物车-享乐音乐商城'
        },
        component: () => import('@/views/shop/')
      }, {
        path: 'user',
        name: "User",

        meta: {
          isShow: true,
          title: '会员登录-享乐音乐商城'
        },
        component: () => import('@/views/user/')
      },
      {
        path: 'shequ',
        name: "Shequ",

        meta: {
          title: '享乐社区-享乐音乐商城'
        },
        component: () => import('@/views/shequ/')
      },
      {
        path: 'category',
        name: "Category",

        meta: {
          title: '唱片-分类-享乐音乐商城'
        },
        component: () => import('@/views/category/')
      }
    ]
  },
  {
    path: '/login',
    name: "Login",
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
    next("/login")
  } else {
    next()
  }
})

export default router
