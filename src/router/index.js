import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children:[
        {
          path:'login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path:'register',
          component: () => import('../views/RegisterView.vue')
        },
        {
          path:'MainHomeView/:isLogin:LoginUUID:loginType',
          component: () => import('../views/MainHomeView.vue')
        }
      ]
    },
    {
      path: '/MainHomeView/:isLogin:LoginUUID:loginType',
      name: 'MainHomeView',
      component: () => import('../views/MainHomeView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin/signin',
      name: 'admin-signin',
      component: () => import('../views/AdminSignin.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      children:[
        {
          path:'register',
          component: () => import('../views/RegisterView.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/EditEquipment',
      name: 'EditEquipment',
      component: () => import('../views/EditEquipmentView.Vue')

    },
    {
      path: '/EquipmentCard/:id',
      name: 'EquipmentCard',
      component: () => import('../components/EquipmentCard.vue')
    },
    {
      path: '/ProductData',
      name: 'ProductData',
      component: () => import('../views/ProductData.vue')
    },
    
  ]
})

export default router
