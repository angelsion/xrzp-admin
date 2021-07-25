import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const Cust = () => import(/* webpackChunkName: "cust" */ '../views/Cust.vue')
const Shop = () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'cust',
        name: 'Cust',
        component: Cust
      },
      {
        path: 'shop',
        name: 'Shop',
        component: Shop
      }
    ]
  },
  {
    path: '/shopp',
    name: 'Shopp',
    component: Shop
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
