import {createRouter, createWebHistory} from 'vue-router'
import Explorer from "@/views/Explorer"
import Main from "@/views/Layouts/Main"
import Auth from "@/views/Layouts/Auth"
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
                path: 'transactions/:hash?',
                name: 'transactions',
                component: () => import(/* webpackChunkName: "transactions" */ '../views/Transactions.vue'),
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
        component: Auth,
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
                path: '',
                redirect: 'explorer'
            }
        ]
    },
    {
        path: '/wallet',
        component: Main,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
                meta: {
                    requiresAuth: true
                }
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
        if (!to.path.startsWith('/explorer') && store.getters.isLoggedIn) {
            return next({name: 'home'})
        }
    }
    next()
})

export default router
