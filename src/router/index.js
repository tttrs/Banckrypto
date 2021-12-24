import {createRouter, createWebHistory} from 'vue-router'
import Explorer from "@/views/Explorer"
import Main from "@/views/Layouts/Main"
import store from './../store'

const routes = [
  {
    path: '/explorer',
    component: Main,
    children: [
      {
        path: '',
        name: 'explorer',
        component: Explorer,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'blocks/:hash?',
        name: 'blocks',
        component: () => import(/* webpackChunkName: "blocks" */ '../views/Blocks.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'transaction/:hash?',
        name: 'transaction',
        component: () => import(/* webpackChunkName: "transaction" */ '../views/Transaction.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'address/:address',
        name: 'address',
        component: () => import(/* webpackChunkName: "address" */ '../views/Address.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import(/* webpackChunkName: "wallet" */ '../views/Wallet.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import(/* webpackChunkName: "transactions" */ '../views/Transactions'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '',
        redirect: 'wallet'
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      return next({name: 'login'})
    }
  } else {
    if (!to.path.startsWith('/wallet') && store.getters.isLoggedIn) {
      return next({name: 'home'})
    }
  }
  next()
})

export default router
