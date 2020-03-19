import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine.vue'),
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/shop',
    redirect: '/shop/goods',
    name: 'Shop',
    component: () => import('../views/Shop/Shop.vue'),
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('../views/Shop/Goods.vue'),
        children: [
          {
            path: 'detail',
            name: 'Detail',
            props: true,
            component: () => import('../views/Shop/Detail.vue')
          }
        ]
      },
      {
        path: 'ratings',
        name: 'Ratings',
        component: () => import('../views/Shop/Ratings.vue'),
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('../views/Shop/Info.vue'),
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
